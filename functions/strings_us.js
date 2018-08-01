const deepFreeze = require('deep-freeze');

const populartoken = 'us/nespresso%20capsules%20compatible%20originalline/salesrank';
const recommendedtoken = 'us/nespresso%20compatible%20originalline/relevancerank';
const newesttoken = 'us/nespresso%20capsules%20compatible%20originalline%20new/relevancerank';
const strongrelevancetoken = 'us/nespresso%20capsules%20compatible%20originalline%20strong/relevancerank';
const delicaterelevancetoken = 'us/nespresso%20capsules%20compatible%20originalline%20soft/relevancerank';

const solutions = [
  '<speak>\n' +
  '  <par>\n' +
  '    <media xml:id="answer" fadeInDur="2s" fadeOutDur="2s" ><audio clipStart="15s" clipEnd="22s" src="https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg"></audio>\n' +
  '    </media>\n' +
  '    <media begin="0.5s">\n' +
  '    <speak>I have found these solutions <break strength="medium"/>. Which one would you like to see?</speak>\n' +
  '    </media>\n' +
  '  </par>\n' +
  '</speak>',

  '<speak>\n' +
  '  <par>\n' +
  '    <media xml:id="answer" fadeInDur="2s" fadeOutDur="2s" ><audio clipStart="15s" clipEnd="22s" src="https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg"></audio>\n' +
  '    </media>\n' +
  '    <media begin="0.5s">\n' +
  '    <speak>Okay, <break strength="medium"/> I have found these solutions basing on your request. <break stregth="medium"/> Which one would you like to see? </speak>\n' +
  '    </media>\n' +
  '  </par>\n' +
  '</speak>',

  '<speak>\n' +
  '  <par>\n' +
  '    <media xml:id="answer" fadeInDur="2s" fadeOutDur="2s" ><audio clipStart="15s" clipEnd="22s" src="https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg"></audio>\n' +
  '    </media>\n' +
  '    <media begin="0.5s">\n' +
  '    <speak>I think you will like these solutions. <break stregth="medium"/> Which one would you like to see? </speak>\n' +
  '    </media>\n' +
  '  </par>\n' +
  '</speak>'];

const pricesFrom = 'Prices starts from ';

const waitingresponses =
  '<speak>\n' +
  '  <par>\n' +
  '    <media xml:id="answer" fadeInDur="2s" fadeOutDur="2s" ><audio clipStart="15s" clipEnd="22s" src="https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg"></audio>\n' +
  '    </media>\n' +
  '    <media begin="0.5s">\n' +
  '    <speak>I am searching for the capsules...<break strength="weak"/></speak>\n' +
  '    </media>\n' +
  '  </par>\n' +
  '</speak>';

const hereis = '<speak> Here is the solution. <break time="500ms"/> Can I help you with something else?</speak>';

const welcomeSuggestions = ['Popular capsules', 'Recommended capsules', 'Strong coffee', 'Lastest capsules', 'What can you do?'];
const otherSolutions = ['Show popular capsules', 'Newest coffee', 'No'];
const buyIt = 'Purchase';

const welcomeText = 'Welcome in CoffeeAdvisor! How can I help?';
const welcome =
  '<speak><par><media xml:id="answer" fadeInDur="2s" fadeOutDur="2s" ><audio clipStart="15s" clipEnd="17s" src="https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg"></audio></media><media begin="1.0s"><speak>Welcome in CoffeeAdvisor!<break strength="medium"/> How can I help? <break strength="weak"/> If you do not know what to ask me you can say <break strength="weak"/> "What can you do?" </speak></media></par></speak>';

const welcomeagainText = 'Welcome back! What type of capsules are you looking for?';
const welcomeagain =
  '<speak>' +
  '<par>' +
  '<media xml:id="answer" fadeInDur="2s" fadeOutDur="0.5s" >' +
  '<audio clipEnd="5s" src="https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg"></audio>' +
  '</media>' +
  '<media begin="1.0s">' +
  '<speak>Welcome back in CoffeeAdvisor.' +
  '<break strength="medium"/> What type of capsules are you looking for? </speak>' +
  '</media>' +
  '</par>' +
  '</speak>';

// Use deepFreeze to make the constant objects immutable so they are not unintentionally modified
module.exports = deepFreeze({
  populartoken,
  recommendedtoken,
  newesttoken,
  strongrelevancetoken,
  delicaterelevancetoken,
  solutions,
  waitingresponses,
  hereis,
  welcome,
  welcomeText,
  welcomeagain,
  welcomeagainText,
  welcomeSuggestions,
  pricesFrom,
  otherSolutions,
  buyIt
});
