const Alexa = require('ask-sdk');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      const speechText = 'Welcome to the movie suggestor!';

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('Welcome!', speechText)
        .getResponse();
    }
  };


  const GetDogNameIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'GetDogNameIntent';
    },
    handle(handlerInput) {
      const dogNames = ['Milou', 'Beethoven', 'Spot', 'Rover', 'Clifford', 'Wishbone', 'Lucky', 'Bear', 'Goofy'];
      const speechText = dogNames[Math.floor(Math.random()*dogNames.length)]; // select random name

      const repromptText = 'Ask for another dog name!'
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(repromptText)
        .withSimpleCard('Here\'s a dog name:', speechText)
        .getResponse();
    }
  };
