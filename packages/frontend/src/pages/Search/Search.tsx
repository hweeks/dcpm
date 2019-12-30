import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, Store } from 'redux'
import { searchUpdate, searchSubmit } from "../../actions/search";
import { Input } from "../../comps/Input";
import { Result } from '../../comps/Result'
import { RootState } from '../../reducers';
import { SearchResult } from '../../reducers/search';

interface SearchProps {
  searchTerm?: string,
  results?: SearchResult[]
  update?: (term: string) => void
  submit?: () => void
}

const SearchComp = ({searchTerm, update, submit, results}: SearchProps) => (<div>
  <Input
    value={searchTerm}
    placeholder='Search for a package via name or tag'
    buttonText="find"
    onChange={update}
    onSubmit={submit}
    />
    {results && results.length > 0 && results.map(props => <Result key={props.name} {...props} />)}
</div>)

const mapStateToProps = (state: RootState) => {
  const { search } = state
  return { ...search }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  update: searchUpdate,
  submit: searchSubmit
}, dispatch)

export const Search = connect(mapStateToProps, mapDispatchToProps)(SearchComp)
