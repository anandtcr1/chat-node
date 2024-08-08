import React, {useState, useEffet} from 'react';
import axios from 'axios';

function QuestionsList() {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffet(() => {
        const list = axios.get('http://localhost:4500/api/interview-details/list')
    }, []);
}

export default QuestionsList;