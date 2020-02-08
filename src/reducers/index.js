import { combineReducers } from 'redux';
import channels from './channelsReducer';
import messages from './messagesReducer';

export default combineReducers({
  channels,
  messages,
});
