import { useState } from "react"
import axios from 'axios';


function CreateUser() {

    const [user, setUser] = useState({
        name: '',
        address: '',
        contactNumber: '',
        emailAddress: '',
        password: '',
        userImage: null
    });

    function handleChange(e) {
        const { name, value, files } = e.target;

        setUser({
            ...user,
            [name]: files ? files[0] : value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const form = new FormData();

        form.append('name', user.name);
        form.append('address', user.address);
        
        form.append('contactNumber', user.contactNumber);
        form.append('emailAddress', user.emailAddress);
        form.append('password', user.password);

        if (user.userImage) {
            form.append('userImage', user.userImage);
        }

        await axios.post('http://localhost:4500/api/user/create-user', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
              }
        });

        console.log('saved');

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" >User Name</label>
                    <input type="text" id="name" name="name" value={user.name} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="address" >Address</label>
                    <input type="text" id="address" name="address" value={user.address} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="contactNumber" >Contact Number</label>
                    <input type="text" id="contactNumber" name="contactNumber" value={user.contactNumber} onChange={handleChange} />
                </div>

                <label>
                    Image:
                    <input type="file" name="userImage" onChange={handleChange} />
                </label>

                <div>
                    <label htmlFor="emailAddress" >Email Address</label>
                    <input type="email" id="emailAddress" name="emailAddress" value={user.emailAddress} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="password" >Password</label>
                    <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />
                </div>

                <div>
                    <input type="submit" value="Save User" />
                </div>
            </form>


        </div>
    )
}

export default CreateUser;