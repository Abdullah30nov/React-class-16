import { TextField } from '@mui/material'
import Style from './Signup.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { auth } from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

function Signup() {
    
    const [FullName, setFullName] = useState('')
    const [Username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleFullNameChange = ((e)=>{setFullName(e.target.value)})
    const handleUsername = ((e)=>{setUsername(e.target.value)})
    const handleEmailChange = ((e)=>{setEmail(e.target.value)})
    const handlePasswordChange = ((e)=>{setPassword(e.target.value)})

    const handleSubmit = (event) => {
        event.preventDefault()
        if (FullName === '' || email === '' || password === '' || Username === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill all fields!",
            });
            return
        }
        const existingData = JSON.parse(localStorage.getItem('UserData')) || [];
        const isEmailTaken = existingData.some(user => user.Email === email);
        const isUsernameTaken = existingData.some(user => user.Userame === Username);
        if (isEmailTaken) {
            Swal.fire({
                icon: "error",
                title: "Email Taken",
                text: "An account with this email already exists!",
            });
            return
        }
        if (isUsernameTaken) {
            Swal.fire({
                icon: "error",
                title: `${Username} This name is not available`,
                text: "An account with this name already exists!",
            });
            return
        }
        const newUser = {
            FullName: FullName,
            Username: Username
        };
        existingData.push(newUser);
        localStorage.setItem('UserData', JSON.stringify(existingData));
        setFullName('')
        setUsername('')
        setEmail('')
        setPassword('')

        
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    // const user = userCredential.user;
    console.log(userCredential);
    Swal.fire({
        icon: "success",
        title: "Success!",
        text: "You have successfully signed up!",
    }).then(() => {
        navigate('/');
    });
    // ...
  })
  .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    console.log(error);
    Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email is Taken",
    })
    // ..
  });
    }

    return (
        <>
            <div className={Style.main}>
                <div className={Style.Login}>
                    <form className={Style.form} onSubmit={handleSubmit}>
                        <h1>Signup</h1><br /><br />
                        <TextField
                            id='outlined-basic'
                            label="Full Name"
                            variant='outlined'
                            value={FullName}
                            onChange={handleFullNameChange}
                            className={Style.Input}
                        /><br /><br />
                            <TextField
                                id='outlined-basic'
                                label="Username"
                                variant='outlined'
                                type="text"
                                value={Username}
                                onChange={handleUsername}
                                className={Style.Input}
                            /><br /><br />
                        <TextField
                            id='outlined-basic'
                            label="Email"
                            variant='outlined'
                            value={email}
                            onChange={handleEmailChange}
                            className={Style.Input}
                        /><br /><br />
                        <TextField
                            id='outlined-basic'
                            label="Password"
                            variant='outlined'
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className={Style.Input}
                        /><br /><br />
                        <p>Already have an <Link to='/'>Account</Link></p>
                        <button type="submit" className={Style.btn}>Signup</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Signup