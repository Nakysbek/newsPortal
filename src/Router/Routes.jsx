import {About} from "../Pages/About";
import {Posts} from "../Pages/Posts";
import {PostIdPage} from "../Pages/PostIdPage";
import {Login} from "../Pages/Login";

export const privateRoutes = [
    {path: "/about", element: About},
    {path: "/posts", element: Posts},
    {path: "/posts/:id", element: PostIdPage},
    // {path: "/error", component: Error},
]

export const publicRoutes = [
    {path: "/login", element: Login},
]

