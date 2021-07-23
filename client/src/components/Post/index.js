import React from 'react';
import styled from 'styled-components/macro';
import PostVoteContainer from './Vote/Container';
import PostJoinContainer from './Join/Container'
import PostContent from './Content';

const Wrapper = styled.div`
  display: flex;
  height: auto;
  background-color: ${props => props.theme.foreground};
`;

const Post = ({ id, votes, score, comments, post, participants, type, full, ...content }) => {
  return (
    <Wrapper>
    <PostVoteContainer id={id} votes={votes} score={score} />
    <PostContent
      showFullPost={full}
      id={id}
      commentCount={comments ? comments.length : 0}
      participantCount={participants ? participants.length : 0}
      {...content}
    />
    <PostJoinContainer id={id} type={type} participants={participants} {...content}/>
  </Wrapper>
  )
}

export default Post;
