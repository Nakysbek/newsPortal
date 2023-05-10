import React, {useContext} from 'react';
import {MyInput} from "../UI/Input/MyInput";
import {MyButton} from "../UI/Button/MyButton";
import {AuthContext} from "../Context";

export const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem("auth", "true")
    }
    return (
        <div>
            <h1>Page to login</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Enter login"/>
                <MyInput type="password" placeholder="Enter password"/>
                <MyButton>Login</MyButton>
            </form>
        </div>
    );
};

