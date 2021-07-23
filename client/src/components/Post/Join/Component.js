import React from 'react';
import styled from 'styled-components/macro';
import JoinButton from './Join';
import LeaveButton from './Leave';

const ButtonBox = styled.div`
  width: 120px;
  height: 30px;
  display: flex;
  text-align: center;
`;

const PostJoin = props => {
  const {
    id,
    token,
    user,
    type,
    joinPost,
    leavePost,
    participants,
    isJoining,
    isLeaving
  } = props;

  if (!token) {
    return <></>;
  }

  const userAsParticipant = participants.filter(p => p.userId === user.id);

  if (userAsParticipant.length === 0) {
    return (
      <ButtonBox>
        <JoinButton onClick={() => joinPost(id)} isJoining={isJoining} type={type} />
      </ButtonBox>
    );
  } else {
    return (
      <ButtonBox>
        <LeaveButton onClick={() => leavePost(id)} isLeaving={isLeaving} type={type} />
      </ButtonBox>
    );
  }
};

export default PostJoin;
