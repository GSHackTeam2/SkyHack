import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { titleValidator } from '../../util/validators';
import { attemptCreatePost } from '../../actions/posts';
import categories from '../../categories';
import withAuth from '../../util/withAuth';
import CreatePostForm from './Component';

const validate = fields => {
  const errors = {};
  const title = fields.title ? fields.title : '';

  errors.title = titleValidator(title);
  // type as link | text is deprecated
  // if (type === 'link') errors.url = urlValidator(url);
  // if (type === 'text') errors.text = textPostValidator(text);
  // errors.type = typeValidator(type);

  return errors;
};

const mapStateToProps = state => ({
  isFetching: state.posts.isFetching,
  post: state.posts.newPost,
  form: state.form.createPost
});

const mapDispatchToProps = { attemptCreatePost };

const enhance = compose(
  reduxForm({
    form: 'createPost',
    initialValues: { category: categories[0], type: false },
    validate
  }),
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const CreatePostFormContainer = enhance(CreatePostForm);

export default CreatePostFormContainer;
