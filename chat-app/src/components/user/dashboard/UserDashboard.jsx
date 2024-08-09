import axios from "axios";
import { useEffect, useState } from "react";

function UserDashboard() {
    const [userId, setUserId] = useState();
    const [questionId, setQuestionId] = useState('66b47f879037a69604ed2905');
    const [questionList, setQuestionList] = useState([]);

    useEffect(() => {
        const form = new FormData();
        form.append('questionId', questionId);

        const questionList = axios.post('http://localhost:4500/api/setup-interview', form)
                            .then((result) => {
                                const qnList = result.data;
                                setQuestionList(qnList);

                                console.log(questionList);
                            })
        
    }, []);

    return(
        <div>
            <h1>Dashboard</h1>
            <div>
                Count : {questionList.length}
            </div>
        </div>
    )
}

export default UserDashboard;