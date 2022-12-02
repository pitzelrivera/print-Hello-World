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
    

    return (
        <div>
            <h2>Article Page!</h2>
            <div className="parent">
                {articleList.length > 0 && articleList.map(doc =>
                    <div className="article">
                        <div className={"title"}>{doc.title}</div>
                    </div>
                )}
                <div className="posts">
                    something else here
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