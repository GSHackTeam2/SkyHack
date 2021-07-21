import React from 'react';
import styled from 'styled-components/macro';
import Button from '../../shared/Button';

const LeaveButtonBase = styled(Button)`
  display: flex;
  align-items: center;
  border-radius: 0;
  padding: 16 16px;
  text-decoration: none;
`;

const LeaveButton = (props) => {
  return (
    <LeaveButtonBase onClick={props.onClick}>leave project</LeaveButtonBase> 
  )
}

export default LeaveButton