import React from 'react';
import styled from 'styled-components/macro';
import Button from '../../shared/Button';

const JoinButtonBase = styled(Button)`
  display: flex;
  align-items: center;
  border-radius: 0;
  padding: 16 16px;
  text-decoration: none;
  width: 100%;
`;

const JoinButton = (props) => {
  return (
    <JoinButtonBase onClick={props.onClick}>join project</JoinButtonBase> 
  )
}

export default JoinButton