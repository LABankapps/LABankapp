import { combineReducers } from 'redux';

import { authentication } from './authentification.reducer';
import { registration } from './registration.reducer';
import { engines } from './engines.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { records } from './records.reducer';

const rootReducer = combineReducers({
  authentication,
  records,
  registration,
  engines,
  users,
  alert
});

export default rootReducer;
