import React from 'react';
import styled from 'styled-components/macro';
import { wideFont } from '../../shared/helpers';

const CardWrapper = styled.div`
  ${wideFont};

  border: 1px solid silver;
  margin-right: 10px;
  padding: 10px;
  min-width: 70px;
  text-align: center;
  color: ${props => props.theme.mutedText};
`

const Card = (props) => {
  const { participant } = props;
  return (
    <CardWrapper>
      <strong>{participant.name}</strong><br /><br />
      <h5 style={{ textDecoration: 'underline' }}>Role</h5>
      {participant ? participant.role : 'No role given.'}
    </CardWrapper>
  )
}

export default Card;