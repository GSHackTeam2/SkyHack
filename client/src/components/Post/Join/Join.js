import React from 'react';
import styled from 'styled-components/macro';
import Button from '../../shared/Button';
import { Link } from 'react-router-dom';

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

const JoinButton = props => {
  const { id, onClick } = props;
  return (
    <JoinButtonBase
      as={Link}
      to={`/joinpost/${id}`}
      onClick={onClick}
    >{`join ${props.type}`}</JoinButtonBase>
  );
};

export default JoinButton;
