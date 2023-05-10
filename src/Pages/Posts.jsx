import React, {useEffect, useRef, useState} from "react";
import "../styles/App.css"
import {PostList} from "../components/PostList";
import {PostForm} from "../components/PostForm";
import {PostFilter} from "../components/PostFilter";
import {MyModal} from "../UI/Modal/MyModal";
import {MyButton} from "../UI/Button/MyButton";
import PostService from "../API/PostService";
import {Loader} from "../UI/Loading/Loader";
import {usePosts} from "../Hooks/usePosts";
import {useFetching} from "../Hooks/useFetching";
import {getPageCount} from "../Utils/Pages";
import {Pagination} from "../UI/Pagination/Pagination";
import {useObserver} from "../Hooks/useObserver";
import {MySelect} from "../UI/Select/MySelect";


export function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: "20px"}} onClick={() => setModal(true)}>
                Create user
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Number of items per page"
                options={[
                    {value: 5, body: '5'},
                    {value: 10, body: '10'},
                    {value: 25, body: '25'},
                    {value: -1, body: 'Show all'},
                ]}
            />
            {postError &&
                <h1>An error has occurred ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Posts about JS"/>
            <div ref={lastElement} style={{height: 20, background: "red"}}/>
            {isPostsLoading &&
                <div style={{display: "flex", justifyContent: "center", marginTop: 200}}><Loader/></div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}


