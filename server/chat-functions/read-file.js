const fs = require("fs").promises;
const fileName = "data.json";

const OpenAI = require("openai");
// const openai = new OpenAI();
const openai = new OpenAI({
    api_key: `sk-proj-54JETop123XYh6woGjaBT3BlbkFJGEbddUQNKfXBtuCKJMTX`
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

async function getChatResponse(user_message) {
    messages = []
    const transcript = {
        "role": "user",
        "content": user_message
    };

    const gpt_response = {
        "role": "assistant",
        "content": "replied for the answer",
    };

    messages = await loadMessages();
    messages.push(transcript);
    console.log(messages);

    

    // Call the chat completion endpoint
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo', // Specify the chat model
        messages: messages,     // Pass the full chat history
    });

    // Log the assistant's response
    console.log('Assistant Response:', response.data.choices[0].message.content);

    saveMessages(messages, gpt_response, fileName);
    return messages;
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