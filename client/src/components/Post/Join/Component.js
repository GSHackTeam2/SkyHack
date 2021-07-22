import React from 'react'
import JoinButton from "./Join";
import LeaveButton from './Leave';

const PostJoin = (props) => {
  const { id, token, joinPost, leavePost } = props;
  
  if (!token) {
    return <></>
  }

  return (
    <div>
      <JoinButton onClick={() => joinPost(id)} />
      <LeaveButton onClick={() => leavePost(id)} />
    </div>
  )
} 

export default PostJoin