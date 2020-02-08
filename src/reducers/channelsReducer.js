import { handleActions } from 'redux-actions';
// import * as actions from '../actions';

const defaultState = {
  channels: [],
  currentChannelId: null,
};

const reducer = handleActions({}, defaultState);

export default reducer;
