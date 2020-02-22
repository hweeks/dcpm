import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, Store } from 'redux'
import { searchUpdate, searchSubmit, searchSelect, searchClear } from "../../actions/search";
import { Input } from "../../comps/Input";
import { Result } from '../../comps/Result'
import { RootState } from '../../reducers';
import { SearchResult } from '../../reducers/search';
import { NoResults } from './styles';

interface SearchProps {
  searchTerm?: string,
  results?: SearchResult[]
  update?: (term: string) => void
  submit?: () => void
  select?: (pkg: string) => void
  clear?: () => void
}

const SearchComp = ({searchTerm, update, submit, results, select, clear}: SearchProps) => (<div>
  <Input
    value={searchTerm}
    placeholder='Search for a package via name or tag'
    buttonText="find"
    onChange={update}
    onSubmit={submit}
    clear={clear}
    />
    { results && results.length > 0 && results.map(props => <Result key={props.name} {...props} select={select}/>)}
    { !Array.isArray(results) && searchTerm && <NoResults>No Results</NoResults>}
</div>)

const mapStateToProps = (state: RootState) => {
  const { search } = state
  return { ...search }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  update: searchUpdate,
  submit: searchSubmit,
  select: searchSelect,
  clear: searchClear
}, dispatch)

export const Search = connect(mapStateToProps, mapDispatchToProps)(SearchComp)
