import React, { useState } from 'react';
import styles from './Login.module.css';
import InputController from './inputcontrollers/InputController';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [errorMsg, setErrorMsg] = useState('');
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSignIn = () => {
        const { email, password } = values;

        if (!email || !password) {
            setErrorMsg('Please fill in both email and password');
        } else {
            setErrorMsg('');
            setSubmitButtonDisabled(true);
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setSubmitButtonDisabled(false);
                    navigate('/dashboard');
                })
                .catch((error) => {
                    setSubmitButtonDisabled(false);
                    setErrorMsg('Invalid email or password');
                    console.error('Error signing in:', error);
                });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Sign In</h1>
                <InputController
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={(event) => setValues({ ...values, email: event.target.value })}
                />
                <InputController
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={(event) => setValues({ ...values, password: event.target.value })}
                />
                <span className={styles.error}>{errorMsg}</span>
                <div className={styles.footer}>
                    <button onClick={handleSignIn} disabled={submitButtonDisabled}>
                        Sign In
                    </button>
                    <p>
                        Don't have an account? <span><Link to="/signup">Sign up</Link></span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;