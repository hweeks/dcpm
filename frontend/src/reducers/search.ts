import { SEARCH_UPDATE, SEARCH_FETCHING, SEARCH_FETCHED, SEARCH_SELECT, SEARCH_CLEAR } from "../actions/search";

export interface SearchResult {
  name: string
  versions: string[]
  requestedVersion: string
  tags: string[]
  about: string
  owner: string
  downloads: number
}

export interface SearchState {
  searchTerm: string
  results?: SearchResult[]
  loading: boolean
  currentPackage?: SearchResult
}

const initialState : SearchState = {
  searchTerm: '',
  results: [],
  loading: false,
}

export interface SearchAction {
  type: string
  payload: SearchResult[] | string
}

const handleResults = (state: SearchState, results: SearchResult[]) => {
  return {...state, results, loading: false}
}

const handleSelection = (state : SearchState, selectedPackage : string) => {
  const currentPackage = state.results?.find((singlePackage) => {
    return singlePackage.name === selectedPackage
  })
  return {...state, currentPackage}
}

export const search = (state = initialState, action: SearchAction) => {
  switch (action.type) {
    case SEARCH_UPDATE:
      return {...state, searchTerm: action.payload}
    case SEARCH_FETCHING:
      return {...state, loading: true}
    case SEARCH_FETCHED:
      return handleResults(state, action.payload as SearchResult[])
    case SEARCH_SELECT:
      return handleSelection(state, action.payload as string)
    case SEARCH_CLEAR:
      return {...state, results: [], searchTerm: ''}
    default:
      return state
  }
}
