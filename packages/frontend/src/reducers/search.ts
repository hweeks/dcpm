import { SEARCH_UPDATE, SEARCH_FETCHING, SEARCH_FETCHED } from "../actions/search";

export interface SearchResult {
  name: string
  versions: string[]
  requestedVersion: string
  tags: string[]
}

export interface SearchState {
  searchTerm: string
  results?: SearchResult[]
  loading: boolean
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
  return {...state, results}
}

export const search = (state = initialState, action: SearchAction) => {
  switch (action.type) {
    case SEARCH_UPDATE:
      return {...state, searchTerm: action.payload}
    case SEARCH_FETCHING:
      return {...state, loading: true}
    case SEARCH_FETCHED:
      return handleResults(state, action.payload as SearchResult[])
    default:
      return state
  }
}
