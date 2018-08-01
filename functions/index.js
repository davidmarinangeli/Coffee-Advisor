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

let objects = {};
let strings = require('./strings_it');
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

const context = 'Posso mostrarti le soluzioni solo su un dispositivo con schermo.';
const notification = 'Le soluzioni della tua ricerca di caffè';
const capabilities = ['actions.capability.SCREEN_OUTPUT'];

function selectNumber (option, conv) {
  let response = 'Errore di selezione, riprova';
  if (option) {
    console.log(objects[option].title);

    response = new BasicCard({
      title: objects[option].title,
      subtitle: 'Prezzi a partire da ' + objects[option].price,
      formattedText: 'Numero variazioni per il prodotto: ' + objects[option].var_num,
      image: { // Mostly, you can provide just the raw API objects
        url: objects[option].URL_image,
        accessibilityText: objects[option].title
      },
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

function manageRequest (token, conv) {
  console.log(options);
  const userOnScreenNow = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
  const userHasScreenAvailable = conv.available.surfaces.capabilities.has('actions.capability.SCREEN_OUTPUT');

  if (userOnScreenNow) {
    return new Promise((resolve, reject) => {
      console.log(options);
      request(url + token + '/', options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log(body);

          let json = JSON.parse(body);

          for (let i = 0; i < json.length; i++) {
            objects[i.toString()] = {
              title: json[i].title,
              URL: json[i].detail_URL,
              price: json[i].min_price,
              var_num: json[i].variations_number,
              URL_image: json[i].image_URL
            };

            if (!json[i].min_price) {
              objects[i].price = json[i].list_price;
            }
            console.log(json[i]);
          }

          let items = {};
          for (let i = 0; i < Object.keys(objects).length; i++) {
            const index = i.toString();
            items[index] = {
              title: objects[index].title,
              description: strings.pricesFrom + objects[index].price,
              image: new Image({
                url: objects[index].URL_image,
                alt: objects[index].title
              })
            };
          }
          const carousel = new Carousel({items});

          conv.ask(strings.solutions[util.getRandomInt(3)]);
          conv.ask(carousel);

          resolve(null);
        } else reject(error);
      });
    });
  } else if (userHasScreenAvailable) {
        // lo trasporto su una piattaforma in cui ha uno schermo
    return (conv.ask(new NewSurface({context, notification, capabilities})));
  } else {
    return (conv.close("Mi dispiace, l'acquisto tramite Google Home non è ancora supportato"));
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
  if (conv.user.locale === 'en-US') {
    strings = require('./strings_us');
  }

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
  return manageRequest(strings.populartoken, conv);
});

app.intent('choose_recommended', conv => {
  return manageRequest(strings.recommendedtoken, conv);
});

app.intent('choose_review', conv => {
  if (conv.user.locale === 'en-US') {
    return manageRequest(strings.newesttoken, conv);
  } else {
    return manageRequest(strings.reviewranktoken, conv);
  }
});

app.intent('choose_soft', conv => {
  return manageRequest(strings.delicaterelevancetoken, conv);
});

app.intent('choose_strong', conv => {
  return manageRequest(strings.strongrelevancetoken, conv);
});

/*
app.intent('choose_lungo', conv => {
    return manageRequest(strongrelevancetoken, conv);
});
*/

exports.nespressoadvisor = functions.https.onRequest(app);
