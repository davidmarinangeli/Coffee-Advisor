# Coffee Advisor 

<p align="center">
  <img width="300" height="300" src="https://raw.githubusercontent.com/davidmarinangeli/Coffee-Advisor/master/Asset%201%403x.png">
</p>

This webhook manage the Coffee Advisor app for Google Assistant. It's all written in Node.js 
and uses the official libraries of Actions On Google (v2).

It is deployed on Firebase Functions. Shout-out to my brother for the amazing icon :D.

## Something about it

Coffee Advisor is a project that came out of the blue during my usual research of coffee capsules for my Nespresso machine.
It connects to Amazon Product APIs in order to search the best coffee basing on specific requests (most popular, recommended, strong ...).
I developed a little part of the backend that connects to Amazon and retrieve the results in Java Spring Boot and deployed it on Google App Engine.

### Features
1. It creates the following *Rich Responses*: Carousel, Basic Card, Suggestion.
1. It handles answers both in Italian and English, thanks to the "strings" files.
1. It handles the movement of the conversation from one platform (Google Home) to another with a screen.
1. It can reply to *select number* (intent OPTION) intents and reply both with voice or touch control.

For more detailed information on development, [mail me](mailto:david.marinangeli@gmail.com). Hope it will help 
other developers who are just arrived in this crazy world of Assistant. 


## License
See LICENSE.md.