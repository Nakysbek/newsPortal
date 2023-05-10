import React, {useContext} from 'react';
import {Routes, Route} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../Router/Routes";
import {Login} from "../Pages/Login";
import {Posts} from "../Pages/Posts";
import {AuthContext} from "../Context";
import {Loader} from "../UI/Loading/Loader";

export const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader/>
    }
    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        element={<route.element/>}
                        path={route.path}
                        key={route.path}
                    />
                )}
                <Route path="/*" element={<Posts to="/posts" replace/>}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={<route.element/>}
                        path={route.path}
                        key={route.path}
                    />
                )}
                <Route path="/*" element={<Login to="/login" replace/>}/>
            </Routes>
    );
};

