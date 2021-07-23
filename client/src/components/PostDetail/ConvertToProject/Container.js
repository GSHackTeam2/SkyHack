import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../../util/withAuth';
import { convertToProject } from '../../../actions/posts';
import ConvertToProject from './Component';

const mapStateToProps = state => {
  const { posts } = state;
  return {
    isConverting: posts.isConverting
  }
}

const mapDispatchToProps = { convertToProject };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const ConvertToProjectContainer = enhance(ConvertToProject);

export default ConvertToProjectContainer;
