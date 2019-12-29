import { Dispatch } from "redux"

export const SEARCH_SUBMIT = "SEARCH_SUBMIT"
export const SEARCH_UPDATE = "SEARCH_UPDATE"
export const SEARCH_FETCHING = "SEARCH_FETCHING"
export const SEARCH_FETCHED = "SEARCH_FETCHED"

const searchUpdateAction = (term: string) => ({
  type: SEARCH_UPDATE,
  payload: term
})

export const searchUpdate = (term: string) => {
  return (dispatch: Dispatch) => {
    dispatch(searchUpdateAction(term))
  }
}

