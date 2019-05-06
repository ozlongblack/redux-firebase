const LISTEN = 'LIST/LISTEN';
const listen = (
  payload
) => ({
  type: LISTEN,
  payload,
});

const SET = 'LIST/SET';
const set = (
  payload
) => ({
  type: SET,
  payload,
});

const ERROR = 'LIST/ERROR';
const error = (
  payload
) => ({
  type: ERROR,
  payload,
});

const UPDATE = 'LIST/UPDATE';
const update = (
  payload
) => ({
  type: UPDATE,
  payload,
});

const UPDATED = 'LIST/UPDATED';
const updated = (
  payload
) => ({
  type: UPDATED,
  payload,
});

export default {
  LISTEN,
  listen,
  SET,
  set,
  ERROR,
  error,
  UPDATE,
  update,
  UPDATED,
  updated,
}
