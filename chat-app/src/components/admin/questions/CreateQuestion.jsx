import React, { useState } from "react";
import axios from "axios";

function CreateQuestion() {
    const [question, setQuestion] = useState({
        questionHeader: '',
        questionDescription: '',
        questionsFile: null
    });

    function handleChange(e) {
        const { name, value, files } = e.target;

        setQuestion({
            ...question,
            [name]: files ? files[0] : value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const form = new FormData();
        form.append('questionHeader', question.questionHeader);
        form.append('questionDescription', question.questionDescription);
        if (question.questionsFile)
            form.append('questionsFile', question.questionsFile);

        await axios.post('http://localhost:4500/api/interview-question/create', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="questionHeader" >Question Header</label>
                    <input type="text" id="questionHeader" name="questionHeader" value={question.questionHeader} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="questionDescription" >Question Description</label>
                    <input type="text" id="questionDescription" name="questionDescription" value={question.questionDescription} onChange={handleChange} />
                </div>

                <label>
                    Questions File:
                    <input type="file" name="questionsFile" onChange={handleChange} />
                </label>

                <div>
                    <input type="submit" value="Save Interview Details" />
                </div>
            </form>
        </div>
    )

}

export default CreateQuestion;