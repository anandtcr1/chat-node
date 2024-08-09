const express = require('express');
const fileUpload = require('express-fileupload');
const getChatResponse = require('./chat-functions/read-file');
const getTextFromAudio = require('./chat-functions/openai');
const axios = require('axios');
const FormData = require('form-data')
const fs = require("fs");
var cors = require('cors')
const mongoose = require('mongoose');
const User = require('./models/User');
const path = require('path');
const Questions = require('./models/Questions');
const ExcelJs = require('exceljs');
const { readExcelFile } = require('./admin/question_management/QuestionFileManagement');


const app = express();
// app.use(express.static('images'));
app.use(express.static(path.join(__dirname, 'public')));

const port = 4500;

// default options
app.use(fileUpload());

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/sample_employee', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/api/chat', async (req, res) => {
    dat = await getChatResponse('');
    res.send(dat);
});

app.post('/api/validate', cors(), async function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('no files');
        return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.audioFile;
    const start = Date.now();
    flName = start + file.name;
    uploadLocation = __dirname + '/audio/' + flName;

    replyLocation = __dirname + '/user_reply/' + flName;

    file.mv(uploadLocation, async function (err) {
        if (err) {
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


app.get('/api/user/user-list', cors(), async function (req, res) {
    const employeeList = await User.find({});
    res.send(employeeList);
})

app.post('/api/user/create-user', cors(), async function (req, res) {

    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('no files');
        return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.userImage;
    const start = Date.now();
    flName = start + file.name;
    filePath = '/public/images/' + flName;
    filePathToSave = '/images/' + flName;
    uploadLocation = __dirname + filePath;

    file.mv(uploadLocation, async function (err) {
        if (err) {
            console.log(err);
            res.status(404).send('Upload failed. Please retry');
        }
        else {
            const user = new User({
                name: req.body.name,
                address: req.body.address,
                contactNumber: req.body.contactNumber,
                userImage: filePathToSave,
                emailAddress: req.body.emailAddress,
                password: req.body.password
            });

            try {
                const newUser = await user.save();
                res.status(201).send(newUser);
            }
            catch (err) {
                res.status(400).send({ message: err.message })
            }
        }
    });
});

app.post('/api/user/add-question', cors(), async function (req, res) {
    const { userId, questionId } = req.body;
    const result = await User.updateOne({_id: userId}, { $set: { questionId: questionId } });
    console.log(result);
    if(result.acknowledged && result.modifiedCount > 0) {
        // await User.updateOne({_id: userId}, { $set: { questionId: questionId } });
        res.status(200).send({ message: 'Records updated' });
    }
    else {
        res.status(404).send({ message: 'Error, User doesnot exists' });
    }
    
});

app.post('/api/user/login', cors(), async function (req, res) {
    const { emailAddress, password } = req.body;

    const user = await User.findOne({ emailAddress, password });
    console.log('user -> ', user);
    if (user)
        res.json(user)
    else
        res.status(404).json({ message: 'Employee not found' });
});

app.get('/api/interview-question/list', cors(), async function (req, res) {
    const questionsList = await Questions.find({});
    res.send(questionsList);
})

app.post('/api/interview-question/create', cors(), async function (req, res) {

    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('no files');
        return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.questionsFile;
    const start = Date.now();
    flName = start + file.name;
    filePath = '/data/interview-questions/' + flName;
    uploadLocation = __dirname + filePath;

    file.mv(uploadLocation, async function (err) {
        if (err) {
            console.log(err);
            res.status(404).send('Upload failed. Please retry');
        }
        else {
            const question = new Questions({
                questionHeader: req.body.questionHeader,
                questionDescription: req.body.questionDescription,
                questionsFile: filePath
            });

            try {
                const newquestion = await question.save();
                res.status(201).send(newquestion);
            }
            catch (err) {
                res.status(400).send({ message: err.message })
            }
        }
    });
});

app.post('/api/setup-interview', cors(), async function (req, res) {
    const id = req.body.questionId;
    const question = await Questions.findOne({_id:id});

    const excelFilePath = __dirname + question.questionsFile;
    const excelData = await readExcelFile(excelFilePath);
    console.log(excelFilePath);
    res.send(excelData);

    
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})

