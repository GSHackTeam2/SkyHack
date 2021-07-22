import React from 'react';
import Label from '../Label';

const Checkbox = ({ field }) => {
  return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Label style={{ marginRight: '5px', marginBottom: '0' }}>{field.label}</Label>
        <input type='checkbox' {...field.input} />
      </div>
  )
}

export default Checkbox;
