// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function quickStart() {
  // The text to synthesize
  const text = 'hi, my name is dirga. i am working at starworks global';

  // Construct the request
  const request = {
    input: {
      ssml: '<speak>The <say-as interpret-as=\"characters\">SSML</say-as>standard <break time=\"1s\"/>is defined by the<sub alias=\"World Wide Web Consortium\">W3C</sub>.</speak>'
    },
    // Select the language and SSML voice gender (optional)
    voice: {
      languageCode: 'en-US',
      name:'en-US-Standard-B',
      ssmlGender:'MALE'
    },
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}

async function main() {
  quickStart();
}

main().catch((error) => {
  console.log(error)
  process.exitCode = 1
})