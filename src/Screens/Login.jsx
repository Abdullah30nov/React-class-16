import { TextField } from '@mui/material';
import Style from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { auth } from './firebase';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [errorShown, setErrorShown] = useState(false);
    const navigate = useNavigate();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };
    function handleSubmit(event) {
        event.preventDefault();
        // if (email === '' || password === '') {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Please Fill Required Fields',
        //         text: 'Both fields are required!',
        //     });
        //     setEmail('');
        //     setPassword('');
        //     // setErrorShown(true);
        //     return;
        // }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user.uid);
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "You have successfully Login!",
                }).then(() => {
                    navigate('/Dashboard');
                });
                // ...
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "error",
                    text: "Account not foung!",
                })
            });
    }

    function LoginGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Login Google Done" + result.user.uid);
                navigate('/Dashboard')
            }).catch((error) => {
                console.log("Login Goole Wrong" + error);
            });
    }
    
    function LoginGithub() {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Login Github Done" + result.user.uid);
                navigate('/Dashboard')
            }).catch((error) => {
                console.log("Login Github Wrong" + error);
            });
    }
    return (
        <div className={Style.main}>
            <div className={Style.Login}>
                <form className={Style.form} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <br />
                    <br />
                    <TextField
                        id='outlined-basic'
                        label='Enter your Email'
                        type='email'
                        variant='outlined'
                        onChange={handleEmailChange}
                        className={Style.Input}
                    />
                    <br />
                    <br />
                    <TextField
                        id='outlined-basic'
                        label='Password'
                        type='password'
                        variant='outlined'
                        onChange={handlePasswordChange}
                        className={Style.Input}
                    />
                    <br />
                    <br />
                    <p>
                        Create New <Link to='/Signup'>Account</Link>
                    </p>
                    <button type='submit' className={Style.btn}>Login</button><br /><br />
                <button onClick={LoginGoogle} className={Style.btn}><GoogleIcon/> Login with Google</button><br /><br />
                <button onClick={LoginGithub} className={Style.btn}><GitHubIcon/> Login with Github</button>
                </form>
            </div>
        </div>
    );
}
export default Login;