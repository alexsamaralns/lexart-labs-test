import SidebarActionTypes from './action-types'

const initialState = {
  sidebarUnfoldable: true,
}

const unfoldableReducer = (state = initialState, action) => {
  switch (action.type) {
    case SidebarActionTypes.SET:
      return { ...state, sidebarUnfoldable: action.payload }
    default:
      return state
  }
}

export default unfoldableReducer
