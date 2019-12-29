import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, Store } from 'redux'
import { searchUpdate } from "../../actions/search";

interface SearchProps {
  searchTerm?: string,
  searchUpdate?: (term: string) => void
}

const SearchComp = ({searchTerm, searchUpdate}: SearchProps) => (<div>
  <input type="text" value={searchTerm} onChange={(e) => {
    const value = e && e.currentTarget && e.currentTarget.value
    if (value) {
      searchUpdate(value)
    }
  }} />
</div>)

const mapStateToProps = (state: any) => {
  const { search } = state
  return { ...search }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  searchUpdate,
}, dispatch)

export const Search = connect(mapStateToProps, mapDispatchToProps)(SearchComp)


