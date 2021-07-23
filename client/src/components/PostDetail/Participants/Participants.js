import React from 'react';
import styled from 'styled-components/macro';
import Card from './Card';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid ${props => props.theme.border};
  ${props => props.round && 'border-radius: 0 0 2px 2px'};
  padding: 8px;
  background-color: ${props => props.theme.foreground};
  font-size: 13px;

  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.mutedText};
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${props => props.withMargin ? '4px' : '0px'}
`;

const Participants = props => {
  const { participants, token, type } = props;

  const getText = () => {
    if (participants.length === 0) {
      return `This ${type} has no participants yet.`
    }

    return `This ${type} has ${participants.length} ` +
    `participant${participants.length !== 1 ? 's' : ''}.`
  }

  return (
    <Wrapper>
      <TitleWrapper>
        <SupervisedUserCircleIcon style={{ marginRight: '2px' }} />
        {getText()}
      </TitleWrapper>

      <CardWrapper round={!token} withMargin={participants.length !== 0}>
        {participants.map(participant => (
          <Card key={participant.userId} participant={participant} />
        ))}
      </CardWrapper>
    </Wrapper>
  );
};

export default Participants;
