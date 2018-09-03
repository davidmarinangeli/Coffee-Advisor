// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const {dialogflow, Carousel, Image, BasicCard, Suggestions, Button, NewSurface, SimpleResponse} = require('actions-on-google');
const functions = require('firebase-functions');

let util = require('./utils');
let auth = require('./auth');
let request = require('request');
const url = 'https://amazonproductserver.appspot.com/';

var options = {
    url: url,
    headers: {
        'Authorization': auth.encrypted
    }
};

const app = dialogflow();

// const lungorelevancetoken = 'capsule%20nespresso%20compatibili%20lungo/relevancerank';

const capabilities = ['actions.capability.SCREEN_OUTPUT'];

function selectNumber(option, conv) {
    let objects = conv.data.array;
    let items = conv.data.carousello;
    let strings = conv.data.lang;
    console.log(strings);

    let response = 'Errore di selezione, riprova';

    if (option) {
        console.log(objects[option]);

        response = new BasicCard({
            title: items[option].title,
            subtitle: items[option].subtitle,
            formattedText: items[option].title,
            image: items[option].image,
            buttons: new Button({ // Wrapper for complex sub Objects
                title: strings.buyIt,
                url: objects[option].URL
            }),
            display: 'WHITE'
        });
    }
    conv.ask(strings.hereis);
    conv.ask(response);
    conv.ask(new Suggestions(strings.otherSolutions));
}

function manageRequest(token, conv) {
    let objects = {};
    let strings = conv.data.lang;

    const userOnScreenNow = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    const userHasScreenAvailable = conv.available.surfaces.capabilities.has('actions.capability.SCREEN_OUTPUT');

    if (userOnScreenNow) {
        return new Promise((resolve, reject) => {
            console.log(options);
            request(url + token + '/', options, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log('here is the body' + body);

                    let json = JSON.parse(body);

                    for (let i = 0; i < json.length; i++) {
                        if (json[i].main_title) {
                            objects[i] = {
                                coffee_title: json[i].main_title,
                                URL: json[i].detail_URL,
                                price: json[i].min_price,
                                var_num: json[i].variations_number,
                                URL_image: json[i].image_URL
                            };

                            if (!json[i].min_price) {
                                objects[i].price = json[i].list_price;
                            }
                        }
                    }

                    let items = {};
                    for (let i = 0; i < Object.keys(objects).length; i++) {
                        items[i] = {
                            title: objects[i].coffee_title,
                            description: strings.pricesFrom + objects[i].price,
                            image: new Image({
                                url: objects[i].URL_image,
                                alt: objects[i].coffee_title
                            })
                        };
                    }

                    // store info inside conversation
                    conv.data.array = objects;
                    conv.data.carousello = items;

                    const carousel = new Carousel({items});
                    const randomindex = util.getRandomInt(3);

                    // dont know why i actually create two temp variables
                    const simpleSSMLString = strings.solutions[randomindex];
                    const simpleTextString = strings.stringsolutions[randomindex];

                    conv.ask(new SimpleResponse({
                        speech: simpleSSMLString,
                        text: simpleTextString
                    }));

                    conv.ask(carousel);

                    console.log(conv);

                    resolve(null);
                } else reject(error);
            });
        });
    } else if (userHasScreenAvailable) {
        let context = strings.context;
        let notification = strings.notification;

        // lo trasporto su una piattaforma in cui ha uno schermo
        return (conv.ask(new NewSurface({context, notification, capabilities})));
    } else {
        return (conv.close(strings.notsupport));
    }
}

// *** COMPORTAMENTO DOPO LA SELEZIONE DI UN ELEMENTO ***
app.intent('choose_popular - select.number', (conv, params, option) => {
    selectNumber(option, conv);
});

app.intent('choose_recommended - select.number', (conv, params, option) => {
    selectNumber(option, conv);
});

app.intent('choose_review - select.number', (conv, params, option) => {
    selectNumber(option, conv);
});

app.intent('choose_strong - select.number', (conv, params, option) => {
    selectNumber(option, conv);
});

app.intent('choose_soft - select.number', (conv, params, option) => {
    selectNumber(option, conv);
});

// *** WELCOME INTENT ***
app.intent('Default Welcome Intent', (conv, params, option) => {
    let strings;
    if ((conv.user.locale).startsWith('it-')) {
        strings = require('./strings_it');
    } else {
        strings = require('./strings_us');
    }

    conv.data.lang = strings;

    if (conv.user.last.seen) {
        conv.ask(new SimpleResponse({
            speech: strings.welcomeagain,
            text: strings.welcomeagainText
        }));
    } else {
        conv.ask(new SimpleResponse({
            speech: strings.welcome,
            text: strings.welcomeText
        }));
    }

    conv.ask(new Suggestions(strings.welcomeSuggestions));
});

app.intent('choose_popular', conv => {
    let strings = checkConversationData(conv);

    return manageRequest(strings.populartoken, conv);
});

app.intent('choose_recommended', conv => {
    let strings = checkConversationData(conv);

    return manageRequest(strings.recommendedtoken, conv);
});

app.intent('choose_review', conv => {
    let strings = checkConversationData(conv);

    if (conv.user.locale === 'en-US') {
        return manageRequest(strings.newesttoken, conv);
    } else {
        return manageRequest(strings.reviewranktoken, conv);
    }
});

app.intent('choose_soft', conv => {
    let strings = checkConversationData(conv);

    return manageRequest(strings.delicaterelevancetoken, conv);
});

app.intent('choose_strong', conv => {
    let strings = checkConversationData(conv);

    return manageRequest(strings.strongrelevancetoken, conv);
});

function checkConversationData(conv) {
    let strings;

    if (conv.data.lang) {
        // if we came here after "welcome" intent, then get language
        strings = conv.data.lang;
    } else {
        // if the Action has been woken up through Implicit Invocations, then get the lang by yourself
        if ((conv.user.locale).startsWith('it-')) {
            strings = require('./strings_it');
        } else {
            strings = require('./strings_us');
        }
        conv.data.lang = strings;
    }
    return strings;
}

/*
app.intent('choose_lungo', conv => {
    return manageRequest(strongrelevancetoken, conv);
});
*/

exports.nespressoadvisor = functions.https.onRequest(app);
