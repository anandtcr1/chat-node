const fs = require("fs").promises;
const fileName = "data.json";
// import path from "path";

const OpenAI = require("openai");
// const openai = new OpenAI();
const openai = new OpenAI({
    apiKey: `sk-proj-54JETop123XYh6woGjaBT3BlbkFJGEbddUQNKfXBtuCKJMTX`
  });



async function readFileAsync() {
    const data = await fs.readFile(fileName, "utf8");
    return data;
}

async function loadMessages() {
    messages = [];
    const defaultMessage = {
        "role": "system",
        "content":
            "you are interviewing the user for a front-end React developer position. Ask short questions that are relevant to junior level developer. Your name is Greg. The user is Anand. Keep responses under 30 words and be funny sometimes.",
    };

    data = await readFileAsync();
    

    if (data.length == 0) {
        messages.push(defaultMessage);
    }
    else {

        const jsonData = JSON.parse(data);
        if (Array.isArray(jsonData)) {
            if (jsonData.length === 0) {
                messages.push(defaultMessage);
                console.log(messages);
            }
            // Using forEach
            jsonData.forEach((item, index) => {
                messages.push(item);
            });
        } else {
            console.error("The JSON data is not an array");
            messages.push(defaultMessage);
        }
    }
    return messages;
}

async function getChatResponse(user_message, replyLocation) {
    messages = []
    const transcript = {
        "role": "user",
        "content": user_message
    };

    // const gpt_response = {
    //     "role": "assistant",
    //     "content": "replied for the answer",
    // };

    messages = await loadMessages();
    messages.push(transcript);
    console.log(messages);

    

    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-4o-mini",
      });
    
    //   console.log(completion.choices[0]);

    // Log the assistant's response
    console.log('Assistant Response:', completion.choices);
    var assistantResponse = completion.choices[0].message.content;
    const gpt_response = {
        "role": "assistant",
        "content": assistantResponse
    };

    saveMessages(messages, gpt_response, fileName);

    speechFile = await convertTextToSpeach(assistantResponse, replyLocation);

    // return assistantResponse;
    return speechFile;
}

async function convertTextToSpeach(assistantResponse, replyLocation) {
    speechFile = replyLocation;
console.log('speechFile ->', speechFile);

    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: assistantResponse,
      });
      console.log(speechFile);
      const buffer = Buffer.from(await mp3.arrayBuffer());
      await fs.writeFile(speechFile, buffer);
      return speechFile;
}

function saveMessages(messages, gpt_response,) {
    messages.push(gpt_response);
    // Convert JSON object to a string
    const jsonString = JSON.stringify(messages, null, 2);

    // Write JSON string to a file
    fs.writeFile(fileName, jsonString, (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("File has been written successfully");
        }
    });
}

module.exports = getChatResponse;