import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../Hooks/useFetching";
import PostService from "../API/PostService";
import {Loader} from "../UI/Loading/Loader";

export const PostIdPage = () => {

    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div>
            <h1>You opened the post page is id = {params.id}</h1>
            {isLoading

                ? <div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
                    <Loader/>
                </div>

                : <div>{post.id}.{post.title}
                    <div>
                        {comments.map(comm =>
                            <div style={{marginTop: 15}} key={comm.id}>
                                <h5>{comm.email}</h5>
                                <div>{comm.body}</div>
                            </div>
                        )}
                    </div>
                </div>

            }
        </div>
    );
};

