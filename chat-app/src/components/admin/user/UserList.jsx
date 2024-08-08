import React, { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:4500/api/user/user-list');
            if (!response.ok) {
                throw new Error('Unable to fetch data');
            }

            const data = await response.json();
            setUsers(data);
            setIsLoading(false);
        };

        fetchUsers();
    }, []);

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
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {users.map(user => (
                        <tr key={user._id}>
                            <td>
                                <img src={'http://localhost:4500' + user.userImage} />
                            </td>
                            <td> {user.name} </td>
                            <td> {user.address} </td>
                            <td> {user.contactNumber} </td>
                            <td> {user.emailAddress} </td>
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