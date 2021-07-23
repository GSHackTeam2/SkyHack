import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import { wideFont } from '../../shared/helpers';
import OptionsHeader from './OptionsHeader';
import './optionsStyle.css';
import './toolTip.css';

const OptionsWrapper = styled.div`
  ${wideFont};
  color: ${props => props.theme.normalText};
`;

const Options = props => {
  const history = useHistory();
  const location = useLocation();
  const [checked, setChecked] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setChecked(0);
        break;
      case '/p':
        setChecked(1);
        break;
      case '/i':
        setChecked(2);
        break;
      default:
        setChecked(-1);
        break;        
    }
  }, [location])

  const checkActive = (num, target) =>
    num === checked || location.pathname === target;

  return (
    <div>
      <OptionsHeader />
      <OptionsWrapper>
        <label className='container'>
          <div className='tooltip option-text'>
            view all
            <span className='tooltiptext'>
              view all posts
            </span>
          </div>

          <input
            type='radio'
            checked={checkActive(0, '/')}
            name='radio'
            onChange={() => {
              setChecked(0);
              history.push('/');
            }}
          />
          <span className='checkmark'></span>
        </label>

        <label className='container'>
          <div className='tooltip option-text'>
            projects only
            <span className='tooltiptext'>
              projects that are currently ongoing
            </span>
          </div>

          <input
            type='radio'
            name='radio'
            checked={checkActive(1, '/p')}
            onChange={() => {
              setChecked(1);
              history.push('/p');
            }}
          />
          <span className='checkmark'></span>
        </label>

        <label className='container'>
          <div className='tooltip option-text'>
            ideas only
            <span className='tooltiptext'>
              ideas to explore
            </span>
          </div>

          <input
            type='radio'
            name='radio'
            checked={checkActive(2, '/i')}
            onChange={() => {
              setChecked(2);
              history.push('/i');
            }}
          />

          <span className='checkmark'></span>
        </label>
      </OptionsWrapper>
    </div>
  );
};

export default Options;
