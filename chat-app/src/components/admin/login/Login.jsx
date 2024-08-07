import { useState } from "react"
import axios from 'axios';

function Login() {

    const [formData, setFormData] = useState({
        emailAddress: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState();

    function handleChange(e) {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        console.log('form data', formData);

        const form = new FormData();

        form.append('emailAddress', formData.emailAddress);
        form.append('password', formData.password);

        await axios.post('http://localhost:4500/api/user/login', form)
                .then((response) => {
                    console.log('response-', response)
                    setErrorMessage('');
                })
                .then((data) => {
                    console.log('data-', data)
                    setErrorMessage('');
                })
                .catch((error) => {
                    setErrorMessage(error.response.data.message);
                    console.log(error.response.data.message);
                });
    }

    return (
        <div>
            <h1>Admin login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="emailAddress" >Enter User Name</label>
                    <input type="text" id="emailAddress" name="emailAddress" value={formData.emailAddress} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Enter Password</label>
                    <input type="text" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
                <div>
                    { errorMessage }
                </div>
            </form>
        </div>
    )
}

export default Login;