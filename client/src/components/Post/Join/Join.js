import React from 'react';
import styled from 'styled-components/macro';
import Button from '../../shared/Button';
import LoadingIndicatorSpinner from '../../shared/LoadingIndicator/Spinner';

const JoinButtonBase = styled(Button)`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 0;
  padding: 16 16px;
  text-decoration: none;
  width: 100%;
`;

const JoinButton = (props) => {
  const { isJoining } = props;
  return (
    <JoinButtonBase onClick={props.onClick}>{`join ${props.type}`}</JoinButtonBase> 
  )
}

export default JoinButton