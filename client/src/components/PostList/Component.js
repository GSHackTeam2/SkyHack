import React from 'react';
import styled from 'styled-components/macro';
import PostListItem from './Item';
import LoadingIndicatorBox from '../shared/LoadingIndicator/Box';
import Empty from '../shared/Empty';

const List = styled.ul`
  list-style: none;
  border: 1px solid ${props => props.theme.border};
  border-radius: 2px;

  @media (max-width: 768px) {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
`;

const HeaderStyle = styled.h2`
  margin-bottom: 10px;
  color: ${props => props.theme.normalText};
`;

const PostListHeader = ({ onlyProjects, onlyIdeas, query }) => {
  const text = onlyProjects
    ? 'Projects To Join'
    : onlyIdeas
    ? 'Ideas'
    : query
    ? `Searching for: ${query}`
    : 'Explore All Posts';
  return <HeaderStyle>{text}</HeaderStyle>;
};

class PostList extends React.Component {
  loadPosts = () => {
    const { username, category } = this.props;
    if (username) return this.props.fetchProfile(username);
    return this.props.fetchPosts(category);
  };

  componentDidMount() {
    if (this.props.query) {
      return;
    }
    this.loadPosts();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.searchResult) {
      return;
    }

    if (
      this.props.category !== prevProps.category ||
      this.props.username !== prevProps.username
    )
      this.loadPosts();
  }

  mapPosts = () => {
    let postsToRender = this.props.posts;
    if (this.props.searchResult) {
      postsToRender = this.props.searchResult;
    } else if (this.props.onlyProjects) {
      postsToRender = this.props.posts.filter(p => p.type === 'project');
    } else if (this.props.onlyIdeas) {
      postsToRender = this.props.posts.filter(p => p.type === 'idea');
    }

    if (postsToRender.length === 0) {
      return <Empty />;
    }

    return postsToRender.map((post, index) => (
      <PostListItem key={index} {...post} />
    ));
  };

  render() {
    const { onlyIdeas, onlyProjects } = this.props;

    if (this.props.isFetching || this.props.isSearching)
      return <LoadingIndicatorBox />;

    if (this.props.query) {
      return (
        <div>
          <PostListHeader
            onlyIdeas={onlyIdeas}
            onlyProjects={onlyProjects}
            query={this.props.query}
          />
          {this.props.searchResult ? (
            this.props.searchResult.length === 0 ? (
              <Empty />
            ) : (
              <List>{this.mapPosts()}</List>
            )
          ) : (
            <Empty />
          )}
        </div>
      );
    }

    if (!this.props.posts || this.props.posts.length === 0) {
      return (
        <div>
          <PostListHeader
            onlyIdeas={onlyIdeas}
            onlyProjects={onlyProjects}
            query={this.props.query}
          />
          <Empty />
        </div>
      );
    }

    return (
      <div>
        <PostListHeader
          onlyIdeas={onlyIdeas}
          onlyProjects={onlyProjects}
          query={this.props.query}
        />
        <List>{this.mapPosts()}</List>
      </div>
    );
  }
}

export default PostList;
