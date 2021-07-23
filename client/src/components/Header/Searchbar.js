import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import SearchIcon from '@material-ui/icons/Search';
import Input from '../shared/form/Input';
import { search } from '../../actions/posts';

const SearchbarWrapper = styled.form`
  display: flex;
  align-items: center;
  border-right: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.normalText};
`;

const SearchBarInput = styled(Input)`
  border: 1px solid ${props => props.theme.normalText};
`

const Searchbar = (props) => {
  const { search } = props;
  const history = useHistory();

  const [query, setQuery] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === '') {
      return;
    }
    search(query)
    history.push(`/search/${query}`)
  }

  return (
    <SearchbarWrapper onSubmit={onSubmit}>
      <SearchBarInput onSubmit={onSubmit} name='query' value={query} onChange={e => setQuery(e.target.value)} />
      <SearchIcon style={{ marginLeft: '8px', marginRight: '8px', fontSize: '18px', cursor: 'pointer' }} onClick={onSubmit}/>
    </SearchbarWrapper>
  )
}

const mapDispatchToProps = { search }

export default connect(null, mapDispatchToProps)(Searchbar);