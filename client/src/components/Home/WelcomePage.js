import React from 'react';
import styled from 'styled-components/macro';
import CloudIcon from '@material-ui/icons/Cloud';
import PostListContainer from '../PostList/Container';

const WelcomeContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid silver;
  padding: 20px;
  box-shadow: 2px 2px 2px lightgray;
  margin-bottom: 10px;
  color: ${props => props.theme.normalText};
`;

const WelcomeDiv = styled.h3`
  display: flex;
  margin-bottom: 10px;
`;

const ContentDiv = styled.div`
  margin-top: 5px;
`;

const WelcomePage = props => {
  return (
    <div>
      <WelcomeContainerDiv>
        <WelcomeDiv>
          <CloudIcon style={{marginRight: '7px' }} />
          Welcome to SkyHack.
        </WelcomeDiv>

        <ContentDiv>
          We built this site to encourage more ideas to take root.
        </ContentDiv>

        <ContentDiv>
          Here, you can browse for existing ideas and comment on them if you
          find them relatable or interesting.
        </ContentDiv>

        <ContentDiv>
          You can also join any projects to contribute and learn.
        </ContentDiv>
      </WelcomeContainerDiv>
      <PostListContainer />
    </div>
  );
};

export default WelcomePage;
