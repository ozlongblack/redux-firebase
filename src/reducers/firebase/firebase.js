import { listen } from '../../actions';
import { metaTypes } from '../../types';

const createReducer = (
  initialState,
  handlers,
) => {
  console.log(initialState);
  return (
    state = initialState,
    action,
  ) => {
    console.log('createrd', state, action);
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  }
};

const getInitialState = () => {
  let state = {};
  Object.keys(metaTypes).forEach(key => {
    const subState = { inProgress: false, error: '', items: {} };
    state[key] = subState;
  });

  return state;
};

const initialState = getInitialState();
console.log(initialState);

export const fb = createReducer(initialState, {
  [listen.FIREBASE_LISTEN_REQUESTED](state, action) {
    console.log(state, action);
    const property = action.meta.type;
    const propertyState = state[property];

    return ({
      ...state,
      [property]: { ...propertyState, inProgress: true, error: '' }
    });
  },
  [listen.FIREBASE_LISTEN_FULFILLED](state, action) {
    console.log(action);
    const { items } = action.payload;
    const property = action.meta.type;
    const propertyState = state[property];

    return ({
      ...state,
      [property]: { ...propertyState, inProgress: false, error: '', items }
    });
  },
});
