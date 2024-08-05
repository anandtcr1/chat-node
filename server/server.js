const express = require('express');
const fileUpload = require('express-fileupload');
const getChatResponse = require('./chat-functions/read-file');
const getTextFromAudio = require('./chat-functions/openai');
const axios = require('axios');
const FormData = require('form-data')
const fs = require("fs");
var cors = require('cors')


const app = express();
const port = 4500;


// const { Configuration, OpenAIApi } = require('openai');

// Initialize OpenAI with your API key
// const configuration = new Configuration({
//     apiKey: `sk-proj-54JETop123XYh6woGjaBT3BlbkFJGEbddUQNKfXBtuCKJMTX`,
// });
// const openai = new OpenAIApi(configuration);




// default options
app.use(fileUpload());

app.use(express.json());


app.get('/api/chat', async (req, res) => {
    dat = await getChatResponse('');
    res.send(dat);
});

app.post('/api/validate', cors(), async function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('no files')
        return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.audioFile;
    const start = Date.now();
    flName = start + file.name;
    uploadLocation = __dirname + '/audio/' + flName;
    
    replyLocation = __dirname + '/user_reply/' + flName;

    console.log(replyLocation);

    file.mv(uploadLocation, async function (err) {
        if(err) {
            console.log(err);
            res.status(404).send('Upload failed. Please retry');
        }
        else {
            var transcript = await getTextFromAudio(uploadLocation);
            //var transcript = 'React is a js library. It is used to create front-end applications.'
            messages = await getChatResponse(transcript, replyLocation)


            res.send(messages);
        }
        
    });
    
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})

