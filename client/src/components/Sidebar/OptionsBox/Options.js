import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components/macro';
import './style.css';
import { wideFont } from '../../shared/helpers';
import OptionsHeader from './OptionsHeader';

const OptionsWrapper = styled.div`
  ${wideFont};
  color: ${props => props.theme.normalText};
`;

const Options = props => {
  const history = useHistory();
  const location = useLocation();
  const [checked, setChecked] = useState(0);
  
  const checkActive = (num, target) => num === checked || location.pathname === target;

  return (
    <div>
      <OptionsHeader />
      <OptionsWrapper>
        <label className='container'>
          <span className='option-text'>View all</span>
          <input type='radio' checked={checkActive(0, '/')} name='radio' onChange={() => {
            setChecked(0);
            history.push("/");
          }}/>
          <span className='checkmark'></span>
        </label>
        <label className='container'>
        <span className='option-text'>Projects only</span>
          <input type='radio' name='radio' checked={checkActive(1, '/p')} onChange={() => {
            setChecked(1);
            history.push("/p");
          }} />
          <span className='checkmark'></span>
        </label>
        <label className='container'>
        <span className='option-text'>Ideas only</span>
          <input type='radio' name='radio' checked={checkActive(2, '/i')} onChange={() => {
            setChecked(2);
            history.push("/i");
          }} />
          <span className='checkmark'></span>
        </label>
      </OptionsWrapper>
    </div>
  );
};

export default Options;
