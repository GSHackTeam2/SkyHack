import React from 'react';
import styled from 'styled-components/macro';
import Button from '../../shared/Button';

const LeaveButtonBase = styled(Button)`
  display: flex;
  align-items: center;
  border-radius: 0;
  padding: 16 16px;
  text-decoration: none;
  width: 100%;
  background-color: #a9a9a9;
`;

const LeaveButton = props => {
  return (
    <LeaveButtonBase
      onClick={props.onClick}
    >{`leave ${props.type}`}</LeaveButtonBase>
  );
};

export default LeaveButton;
