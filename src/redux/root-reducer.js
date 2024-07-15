import { combineReducers } from 'redux'
import userReducer from './user/reducer'
import unfoldableReducer from './sidebarUnfoldable/reducer'
import sidebarShowReducer from './sidebarShow/reducer'

const rootReducer = combineReducers({
  userReducer,
  unfoldableReducer,
  sidebarShowReducer,
})

export default rootReducer
