const Alexa = require('ask-sdk');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      const speechText = 'Welcome to the movie suggester!';

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('Welcome!', speechText)
        .getResponse();
    }
  };


  const GetMovieIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'GetMovieIntent';
    },
    async handle(handlerInput) {
        //diff lists for diff genres?

      const attributesManager = handlerInput.attributesManager;
      let attributes = await attributesManager.getSessionAttributes();
      if (!attributes.hasOwnProperty('moviesName'))attributes.moviesName=[];

      const mood_slot = handlerInput.requestEnvelope.request.intent.slots.mood.value;
      let speechText;
      console.log(mood_slot);
      const movieNames = ['Beetlejuice', 'Ghostbusters',  'Bear', 'Wild'];
      const sadMovieNames = ['The Whale', 'The Last Five Years','The Banshies of Inisherin'];
      const happyMovieNames = ['Mamma Mia', 'Mamma Mia 2','High School Musical'];

      if (mood_slot == "sad"){
        speechText = sadMovieNames[Math.floor(Math.random()*sadMovieNames.length)]; // select random name
      }
      else if (mood_slot == "happy"){
        speechText = happyMovieNames[Math.floor(Math.random()*happyMovieNames.length)]; // select random name

      }
      else{
        speechText = movieNames[Math.floor(Math.random()*movieNames.length)]; // select random name

      }
      console.log(speechText);


      attributes.moviesName.push(speechText);
      attributes.moviesName.push("wild");


      handlerInput.attributesManager.setSessionAttributes(attributes);

      console.log(attributes.moviesName[0]);
      console.log(attributes.moviesName[1]);

      const movie = speechText;
      const repromptText = 'Ask for another movie name!'
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(repromptText)
        .withSimpleCard('Here\'s a movie name:', speechText)
        .getResponse();
    }
  };

  const GetMovieRatingHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'GetMovieRating';
    },
    async handle(handlerInput) {
        //diff lists for diff genres?

      const attributesManager = handlerInput.attributesManager;
      let attributes = await attributesManager.getSessionAttributes();
      if (!attributes.hasOwnProperty('moviesName'))attributes.moviesName=[];

      handlerInput.attributesManager.setSessionAttributes(attributes);


      const repromptText = 'Ask for another movie name!'
      return handlerInput.responseBuilder
        .speak(attributes.moviesName[0])
        .reprompt(repromptText)
        .withSimpleCard('Here\'s a movie name:')
        .getResponse();
    }
  };

  const HelpIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      const speechText = 'You can ask me for a movie name!';

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('Help', speechText)
        .getResponse();
    }
  };

  const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
          || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
      const speechText = 'Come back for more, film bro!';

      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Chow chow', speechText)
        .withShouldEndSession(true)
        .getResponse();
    }
  };

  const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
      //any cleanup logic goes here
      //e.g. deleting any database entires lying around
      return handlerInput.responseBuilder.getResponse();
    }
  };

  const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`); // log to CloudWatch console

      return handlerInput.responseBuilder
        .speak('Sorry, I can\'t understand the command. Please say again.')
        .reprompt('Sorry, I can\'t understand the command. Please say again.')
        .getResponse();
    },
  };

  let skill;

exports.handler = async function (event, context) {
  console.log(`REQUEST++++${JSON.stringify(event)}`); // log to CloudWatch console
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        GetMovieIntentHandler,
        GetMovieRatingHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
      )
      .addErrorHandlers(ErrorHandler)
      .create();
  }

  const response = await skill.invoke(event, context);
  console.log(`RESPONSE++++${JSON.stringify(response)}`); // log to CloudWatch console

  return response;
};
