import { FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE, REQUEST_INIT } from "../actions/itemsActions";
const initialState = {
  items: [],
  error: null,
  loading: false
};
const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_INIT:
      return { ...state, loading: true };
    case FETCH_ITEMS_SUCCESS:
      return { ...state, items: action.items, error: null, loading: false };
    case FETCH_ITEMS_FAILURE:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};
export default itemsReducer;