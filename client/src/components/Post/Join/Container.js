import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../../util/withAuth';
import { joinPost, leavePost } from '../../../actions/posts';
import PostJoin from './Component';

const mapStateToProps = state => {
  const { auth, posts } = state;
  return {
    user: auth.user,
    isJoining: posts.isJoining,
    isLeaving: posts.isLeaving
  }
}

const mapDispatchToProps = { joinPost, leavePost };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const PostJoinContainer = enhance(PostJoin);

export default PostJoinContainer;
