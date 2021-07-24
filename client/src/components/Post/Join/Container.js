import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../../util/withAuth';
import { pushPostDetails, leavePost } from '../../../actions/posts';
import PostJoin from './Component';

const mapStateToProps = state => {
  const { auth, posts } = state;
  return {
    user: auth.user,
    isJoining: posts.isJoining,
    isLeaving: posts.isLeaving
  }
}

const mapDispatchToProps = { pushPostDetails, leavePost };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const PostJoinContainer = enhance(PostJoin);

export default PostJoinContainer;
