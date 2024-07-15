import SidebarShowActionTypes from './action-types'

const initialState = {
  sidebarShowHideClick: true,
}

const sidebarShowReducer = (state = initialState, action) => {
  switch (action.type) {
    case SidebarShowActionTypes.SHOW:
      return { ...state, sidebarShowHideClick: action.payload }
    default:
      return state
  }
}

export default sidebarShowReducer
