import React from 'react';
function Post()
{
  return (
    <div className="post">
      
        <img alt="image0" src="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80"/>
        <div className="text">
        <h2>burd</h2>
          <p className="infor ">
            <a className="author">Marcus aurelius</a>
            <time>
              2023-03-11 19:18
            </time>
          </p>
        <p className="summary">In this tutorial, I'm going to show you how to build a fullstack blog app using MERN (mongo, express, react, node). 

        This blog app tutorial is designed for beginners and will teach you the basics of building a blog app using MERN. By the end of this tutorial, you will have a working blog app that you can use to publish your blog content.
        </p>
        </div>
  
      </div>
  )
}
export default Post;