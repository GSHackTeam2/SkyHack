import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../../util/withAuth';
import { joinPost, leavePost } from '../../../actions/posts';
import PostJoin from './Component';

const mapDispatchToProps = { joinPost, leavePost };

const enhance = compose(
  withAuth,
  connect(
    null,
    mapDispatchToProps
  )
);

const PostJoinContainer = enhance(PostJoin);

export default PostJoinContainer;
