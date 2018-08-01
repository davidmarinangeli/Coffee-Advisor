const deepFreeze = require('deep-freeze');

const populartoken = '/it/capsule%20nespresso%20compatibili/popularityrank';
const recommendedtoken = '/it/capsule%20nespresso%20compatibili/relevancerank';
const reviewranktoken = '/it/capsule%20nespresso%20compatibili/reviewrank';
const strongrelevancetoken = '/it/capsule%20nespresso%20compatibili%20intenso/relevancerank';
const delicaterelevancetoken = '/it/capsule%20nespresso%20compatibili%20delicato/relevancerank';

const solutions = [
  '<speak>\n' +
  '  <par>\n' +
  '    <media xml:id="answer" fadeInDur="2s" fadeOutDur="2s" ><audio clipStart="15s" clipEnd="22s" src="https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg"></audio>\n' +
  '    </media>\n' +
  '    <media begin="0.5s">\n' +
  '    <speak>Ecco le soluzioni<break strength="medium"/>. Quali vuoi vedere?</speak>\n' +
  '    </media>\n' +
  '  </par>\n' +
  '</speak>',

  '<speak>\n' +
  '  <par>\n' +
  '    <media xml:id="answer" fadeInDur="2s" fadeOutDur="2s" ><audio clipStart="15s" clipEnd="22s" src="https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg"></audio>\n' +
  '    </media>\n' +
  '    <media begin="0.5s">\n' +
  '    <speak> Ho trovato queste capsule <break strength="medium"/>. Quali vuoi vedere?</speak>\n' +
  '    </media>\n' +
  '  </par>\n' +
  '</speak>',

  '<speak>\n' +
  '  <par>\n' +
  '    <media xml:id="answer" fadeInDur="2s" fadeOutDur="2s" ><audio clipStart="15s" clipEnd="22s" src="https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg"></audio>\n' +
  '    </media>\n' +
  '    <media begin="0.5s">\n' +
  '    <speak> Ho trovato queste soluzioni basandomi sulla tua richiesta. <break strength="medium"/> Quali vuoi vedere?</speak>\n' +
  '    </media>\n' +
  '  </par>\n' +
  '</speak>'];

const pricesFrom = 'I prezzi partono da ';

const waitingresponses =
  '<speak>\n' +
  '  <par>\n' +
  '    <media xml:id="answer" fadeInDur="2s" fadeOutDur="2s" ><audio clipStart="15s" clipEnd="22s" src="https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg"></audio>\n' +
  '    </media>\n' +
  '    <media begin="0.5s">\n' +
  '    <speak>Sto cercando le capsule...<break strength="weak"/></speak>\n' +
  '    </media>\n' +
  '  </par>\n' +
  '</speak>';

const hereis = '<speak>Ecco le capsule che avevi richiesto. <break time="500ms"/> Posso esserti utile in altro modo?</speak>';

const welcomeSuggestions = ['Capsule popolari', 'Capsule consigliate', 'Caffè intenso', 'Caffè più recensito', 'Cosa sai fare?'];
const otherSolutions = ['Mostra Capsule popolari', 'Mostra caffè più valutato', 'No'];
const buyIt = 'Acquista';

const welcomeText = 'Benvenuto! Come posso esserti utile?';
const welcome =
  '<speak><par><media xml:id="answer" fadeInDur="2s" fadeOutDur="2s" ><audio clipStart="15s" clipEnd="17s" src="https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg"></audio></media><media begin="1.0s"><speak>Benvenuto in <sub alias="Coffi Advisor">CoffeeAdvisor! </sub><break strength="medium"/> Come posso esserti utile? <break strength="weak"/> Se sei indeciso puoi sempre chiedermi <break strength="weak"/> "cosa sai fare?" </speak></media></par></speak>';

const welcomeagainText = 'Bentornato! Di che capsule hai bisogno oggi?';
const welcomeagain =
  '<speak><par><media xml:id="answer" fadeInDur="2s" fadeOutDur="0.5s" ><audio clipEnd="5s" src="https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg"></audio></media><media begin="1.0s"><speak>Bentornato in <sub alias="Coffi Advisor">CoffeeAdvisor! </sub><break strength="medium"/> Di cosa hai bisogno oggi? </speak></media></par></speak>';

// Use deepFreeze to make the constant objects immutable so they are not unintentionally modified
module.exports = deepFreeze({
  populartoken,
  recommendedtoken,
  reviewranktoken,
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
