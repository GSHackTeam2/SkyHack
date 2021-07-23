import React from 'react'
import styled from 'styled-components/macro';
import JoinButton from "./Join";
import LeaveButton from './Leave';

const ButtonBox = styled.div`
  width: 120px;
  height: 30px;
  display: flex;
  text-align: center;
`;

const PostJoin = (props) => {
  const { id, token, user, joinPost, leavePost, participants } = props;
  
  if (!token) {
    return <></>
  }

  const userAsParticipant = participants.filter(p => p.userId === user.id);

  if (userAsParticipant.length === 0) {
    return <ButtonBox><JoinButton onClick={() => joinPost(id)} /></ButtonBox>
  } else {
    return <ButtonBox><LeaveButton onClick={() => leavePost(id)} /></ButtonBox>
  }

} 

export default PostJoin 