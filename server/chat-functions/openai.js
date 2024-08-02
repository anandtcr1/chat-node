const axios = require('axios');
const fs = require("fs");
const FormData = require('form-data')

async function getTextFromAudio() {
    const form = new FormData();
    form.append('file', fs.createReadStream(uploadLocation));
    form.append('model', 'whisper-1'); // Specify Whisper model
    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', form, {
        headers: {
            ...form.getHeaders(),
            'Authorization': `Bearer sk-proj-54JETop123XYh6woGjaBT3BlbkFJGEbddUQNKfXBtuCKJMTX`
        }
    });

    return response.data.text;
}

module.exports = getTextFromAudio;