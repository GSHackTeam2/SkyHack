import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import LoadingIndicatorBox from '../../shared/LoadingIndicator/Box';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.border};
  ${props => props.round && 'border-radius: 0 0 2px 2px'};
  padding: 8px;
  background-color: ${props => props.theme.foreground};
  font-size: 13px;

  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.mutedText};
`;

const ConvertToProject = props => {
  const { token, convertToProject, post, isConverting } = props;

  const ToProject = () => {
    return (
      <div>
        This project has not been initiated by anyone. You can kickstart it
        <Link
          style={{ marginLeft: '3px' }}
          onClick={() => convertToProject(post.id, 'project')}
        >
          here
        </Link>
        .
      </div>
    );
  };

  const ToIdea = () => {
    return (
      <div>
        You can revert this project back to an idea
        <Link
          style={{ marginLeft: '3px' }}
          onClick={() => convertToProject(post.id, 'idea')}
        >
          here
        </Link>
        .
      </div>
    );
  };

  if (isConverting) {
    return <LoadingIndicatorBox />;
  }

  return (
    <Wrapper>
      <TitleWrapper>
        <PlayCircleFilledIcon style={{ marginRight: '2px' }} />
        {post.type === 'idea' ? <ToProject /> : <ToIdea />}
      </TitleWrapper>
    </Wrapper>
  );
};

export default ConvertToProject;
