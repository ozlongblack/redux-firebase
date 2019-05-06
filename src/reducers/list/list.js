import { list } from '../../actions';

const DEFAULT_STATE = {
  loading: false,
  error: null,
  items: null,
};
const DEFAULT_ACTION = {
  type: '',
  payload: DEFAULT_STATE,
};

export default(
  state = DEFAULT_STATE,
  action = DEFAULT_ACTION,
) => {
  switch (action.type) {
    case list.LISTEN:
      return {
        ...state,
        loading: true,
      };
    case list.SET:
      return {
        ...state,
        loading: false,
        items: action.payload
      };

    case list.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case list.UPDATE:
      return {
        ...state,
        loading: true,
      };

    case list.UPDATED:
      return {
        ...state,
        loading: false,
        items: Object.assign(
          {},
          state.items,
          { [action.payload.id]: action.payload }
        ),
      };

    default:
      return state;
  }
}
