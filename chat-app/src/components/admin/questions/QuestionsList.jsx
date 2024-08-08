import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuestionsList() {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4500/api/interview-question/list')
            .then((response) => {
                const data = response.data;
                setQuestions(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError(error);
            })
    }, []);

    if (isLoading) return <div>Loading Data...</div>
    if (error) return <div>Network error </div>

    return (
        <div>
            <h1>Questions List</h1>

            <table>
                <thead>
                    <tr>
                        <th>Question Header</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {questions.map(question => (
                        <tr key={question._id}>
                            <td> {question.questionHeader} </td>
                            <td> {question.questionDescription} </td>
                            <td>
                                <button>Edit</button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default QuestionsList;