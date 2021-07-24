import React from 'react';
import { Field } from 'redux-form';
import Form from '../shared/form/Form';
import renderField from '../shared/form/renderField';
import SubmitButton from '../shared/form/SubmitButton';

class JoinFormPost extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { token, history } = this.props;
    if (!token) history.push('/');
  }

  onSubmit = join => {
    const role = join.role ? join.role : '';
    const contribution = join.contribution ? join.contribution : '' ;
    this.props.joinPost(this.props.id, role, contribution).then(res => {
      const { history, post } = this.props;
      history.push(`/a/${post.category}/${post.id}`)
    });
  };

  render() {
    return (
      <div>
        <Form
          loading={this.props.isFetching || this.props.isJoining}
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          wide
        >
          <Field name='role' label='role' type='text' component={renderField} />

          <Field
            name='contribution'
            label='description'
            type='textarea'
            component={renderField}
          />

          <SubmitButton type='submit'>join</SubmitButton>
        </Form>
      </div>
    );
  }
}

export default JoinFormPost;
