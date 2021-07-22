import React from 'react';
import styled from 'styled-components/macro';
import PostContentTitle from './Title';
import PostContentPreview from './Preview';
import PostContentFullText from './FullText';
import PostContentDetail from './Detail';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-left: 1px solid ${props => props.theme.border};
  padding: 8px;
  min-width: 0;
`;

const renderContent = props => {
  if (props.showFullPost) {
    return <PostContentFullText>{props.text}</PostContentFullText>;
  } else {
    return <PostContentPreview>{props.text}</PostContentPreview>;
  }
};

const PostContent = ({
  url,
  title,
  type,
  text,
  commentCount,
  showFullPost,
  participantCount,
  ...details
}) => (
  <Wrapper>
    <PostContentTitle
      url={url}
      title={title}
      type={type}
      full={showFullPost}
      {...details}
    />
    {renderContent({ type, url, text, showFullPost })}
    <PostContentDetail commentCount={commentCount} participantCount={participantCount} {...details} />
  </Wrapper>
);

export default PostContent;
