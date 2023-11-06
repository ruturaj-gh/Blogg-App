import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {formatISO9075} from "date-fns";
export default function PostPage(){
  const [postInfo,setPostInfo]=useState(null);
  const {id}=useParams();
  
  useEffect(()=>{
    
    
      fetch(`http://localhost:4000/post/${id}`)
      .then(response=>{
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(postInfo=>{
        setPostInfo(postInfo);
        console.log(postInfo);
      })
      .catch(err=>{
        console.log(err);
      });

  },[]);
  if(!postInfo) return '';

  return (
    <>
    <div className="post-page">
    <h1>{postInfo.title}</h1>
      <div className="image">
      <img src={`http://localhost:4000/${postInfo.cover}`} alt=" " ></img>
      </div>
      
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <p>{postInfo.summary}</p>

      <div dangerouslySetInnerHTML={{__html: postInfo.content}}></div>

    </div>
    
    </>
  );
}
