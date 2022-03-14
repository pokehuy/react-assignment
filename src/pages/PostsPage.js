import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [e, setError] = useState("");
    const [searchText, setSearchText] = useState("");
    const [sort, setSort] = useState({
        sortById: false,
        sortByTitle: false
    });
    const [asc, setASC] = useState(false);
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    useEffect(() => {
        let didCancel = false;
        let header = [];
        if(token){
            header["Authorization"] = token;
        }

        axios({
            method: "GET",
            url: `https://jsonplaceholder.typicode.com/posts`,
            headers: header
        }).then(response => {
            if (!didCancel) {
                setPosts(response.data);
                setIsLoading(false);
            }
        }).catch((e) => {
            if (!didCancel) {
                setError(e.message);
                setIsLoading(false);
            }
        })
        return () => {
            didCancel = true;
        };
    }, []);

    if (isLoading) {
        return <div>is Loading...</div>
    }

    if (e) return <div style={{ color: "red" }}>{e}</div>;

    const postsFiltered = posts.filter(post => 
        post.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const getPostsSorted = () => {
        if (!sort.sortById && !sort.sortByTitle) {
            return postsFiltered;
        }
        if (sort.sortById && asc) {
            return postsFiltered.sort((post1, post2) => post1.id - post2.id)
        }
        if (sort.sortById && !asc) {
            return postsFiltered.sort((post1, post2) => post2.id - post1.id)
        }
        if (sort.sortByTitle && asc) {
            return postsFiltered.sort((post1, post2) => { 
                if(post1.title.toLowerCase() < post2.title.toLowerCase()) return -1;
                if(post1.title.toLowerCase() > post2.title.toLowerCase()) return 1;
             })
        }
        if (sort.sortByTitle && !asc) {
            return postsFiltered.sort((post1, post2) => { 
                if(post1.title.toLowerCase() < post2.title.toLowerCase()) return 1;
                if(post1.title.toLowerCase() > post2.title.toLowerCase()) return -1;
             })
        }
    }

    const postsSorted = getPostsSorted();

    const handleSort = (evt) => {
        if (evt.target.id === "id") {
            setASC(!asc);
            setSort({sortById: true,sortByTitle: false});
        }
        if (evt.target.title === "title") {
            setASC(!asc);
            setSort({sortById: false,sortByTitle: true});
        }

    }

    return (
        <>
            <div>
                <input type="text"
                       className="form-control"
                       id="post_title"
                       placeholder="Search posts title"
                       onChange={evt => setSearchText(evt.target.value)}
                />
                <table>
                    <thead>
                    <tr>
                        <th
                            id="id"
                            onClick={handleSort}
                        >Id
                        </th>
                        <th
                            id="title"
                            onClick={handleSort}
                        >Title
                        </th>
                        <th>Content</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {postsSorted.map(post => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default PostsPage;
