import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState();
    const [selectedUserId, setSelectedUserId] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            const response = await fetch('http://localhost:4500/api/user/user-list');
            if (!response.ok) {
                throw new Error('Unable to fetch data');
            }

            const data = await response.json();
            setUsers(data);
            setIsLoading(false);

            setIsLoading(true);
            axios.get('http://localhost:4500/api/interview-question/list')
                .then((response) => {
                    console.log(response.data);
                    const qnData = response.data;
                    setQuestions(qnData);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setError(error);
                })
        };

        fetchUsers();
    }, []);

    const handleDropdownChange = (event, id) => {
        const newValue = event.target.value;
        setSelectedQuestionId(newValue);
        setSelectedUserId(id);
    };

    const mapQuestion = () => {
        const form = new FormData()
        form.append('userId', selectedUserId);
        form.append('questionId', selectedQuestionId);

        axios.post('http://localhost:4500/api/user/add-question', form)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log('error', err);
            })
    }

    if (isLoading) return <p>Loading..</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            <h1>User List</h1>

            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>User Name</th>
                        <th>Address</th>
                        <th>Contact Number</th>
                        <th>Email Address</th>
                        <th>Map Question</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {users.map(user => (
                        <tr key={user._id}>
                            <td>
                                <img style={{ width: '40px' }} src={'http://localhost:4500' + user.userImage} />
                            </td>
                            <td> {user.name} </td>
                            <td> {user.address} </td>
                            <td> {user.contactNumber} </td>
                            <td> {user.emailAddress} </td>
                            <td>
                                <select key={user._id}
                                    onChange={(event) => handleDropdownChange(event, user._id)}>
                                    {questions.map(question => (
                                        <option key={question._id} value={question._id} >{question.questionHeader}</option>
                                    ))}
                                </select>
                                <button onClick={mapQuestion}>Update</button>
                            </td>
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

export default UserList;