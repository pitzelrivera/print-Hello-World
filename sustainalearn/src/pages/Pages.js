import React, { Component } from 'react';
import App from "../App";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios'
import { User, Post, ArticleInfo, Tag, ArticleTag } from "../db/types";
import readError from "../db/errorHandle";
import './Pages.css';

const Pages = () => {
    const {id} = useParams();
    const [postList, setPostList] = useState([])
    const [articleList, setArticleList] = useState([])
    const articleUrl = "http://localhost:3001/api/getArticle/" + id.toString();
    const postsUrl = "http://localhost:3001/api/getArticlePosts/" + id.toString();

    useEffect(() => {
        console.log("PAGE LOADED");

        const getData = async () => {
            const res1 = await Axios.get(articleUrl)
                .then(response => {
                    setArticleList(response.data);
                });

            const res2 = await Axios.get(postsUrl)
                .then(response => {
                    setPostList(response.data);
                });
        }
        getData();

    }, []);

    function ChildPost(post, postList) {
        const childPosts = null;
        postList.map((child) => {
           if (child.parentId === post.id) {
               childPosts.push(child);
               postList.delete(child);
           }
           console.log(childPosts);

           return childPosts;
        });
    }


    return (
        <div>
            <h2>Article Page!</h2>
            <div className="parent">
                {articleList.length > 0 && articleList.map(doc =>
                    <div className="article">
                        <div className={"title"}>
                            {doc.title}
                            <div className={"author"}>
                                {doc.author}
                            </div>
                        </div>
                        <div className={"content"}>
                            <br/>
                            {doc.content}
                        </div>
                    </div>
                )}
                <div className={"chatBox"}>
                    <div className={"chatTitle"}><b>Chat here!</b></div>
                    {postList.length > 0 && postList.map(post =>
                        <div className={"posts"}>
                            <div className={"parentPost"}>
                                <li>
                                    {post.username}: {post.message}
                                    <ul>
                                        <li>Children will go here</li>
                                    </ul>
                                </li>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <body>
                    more content here below<br/>
                    a lot<br/>
                    .<br/>
                    .<br/>
                    .<br/>
                    .
                    .
                    more
                </body>
            </div>
        </div>
    )
};

export default Pages;