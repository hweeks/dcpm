import { combineReducers } from 'redux'
import { search } from './search'

export const reducer = combineReducers({search})

export type RootState = ReturnType<typeof reducer>
