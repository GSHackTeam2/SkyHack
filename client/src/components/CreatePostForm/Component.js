import React from 'react';
import { Field } from 'redux-form';
import categories from '../../categories';
import Form from '../shared/form/Form';
import renderField from '../shared/form/renderField';
import SubmitButton from '../shared/form/SubmitButton';

class CreatePostForm extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { token, post, history } = this.props;
    if (!token) history.push('/');
    if (post) history.push(`/a/${post.category}/${post.id}`);
  }

  onSubmit = post => {
    // checkbox: true for project, false for an idea
    post.type = post.type ? 'project' : 'idea'
    this.props.attemptCreatePost(post);
  }

  mapCategories = () =>
    categories.map((category, index) => (
      <option key={index} value={category}>
        {category}
      </option>
    ));

  render() {
    return (
      <Form
        loading={this.props.isFetching}
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        wide
      >
        <Field
          name='category'
          label='category'
          type='select'
          component={renderField}
        >
          {this.mapCategories()}
        </Field>
        <Field name='title' label='title' type='text' component={renderField} />

        <Field
            name='text'
            label='project description'
            type='textarea'
            component={renderField}
          />

        <Field
          name='type'
          label='create this as a project'
          type='checkbox'
          component={renderField}
        />

        <SubmitButton type='submit'>create</SubmitButton>
      </Form>
    );
  }
}

export default CreatePostForm;
