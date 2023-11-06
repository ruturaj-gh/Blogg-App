import React from 'react';
import {formatISO9075} from 'date-fns';
import { Link } from 'react-router-dom';
function Post({_id,title,summary,cover,content,createdAt,author})
{

  return (
    <div className="post">
  <div className="image">
    <Link to={`/post/${_id}`} className="post-link">
      <img src={`http://localhost:4000/${cover}`} alt={title} className="post-image" />
    </Link>
  </div>
  <div className="texts">
    <Link to={`/post/${_id}`} className="post-link">
      <h2 className="post-title">{title}</h2>
    </Link>
    <p className="post-details">
      <span className="date">{formatISO9075(new Date(createdAt))}</span>
    </p>
  </div>
  <p className="summary">{summary}</p>
</div>

  
);
  
}
export default Post;
