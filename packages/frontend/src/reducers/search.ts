import { SEARCH_UPDATE } from "../actions/search";

export interface SearchResult {
  name: string
  versions: string[]
  requestedVersion: string
  tags: string[]
}

export interface SearchState {
  searchTerm: string
  results?: SearchResult[]
}

const initialState : SearchState = {
  searchTerm: '',
  results: []
}

export interface SearchAction {
  type: string
  payload: SearchResult[] | string
}

export const search = (state = initialState, action: SearchAction) => {
  switch (action.type) {
    case SEARCH_UPDATE:
      return {...state, searchTerm: action.payload}
    default:
      return state
  }
}
