import { combineReducers } from 'redux';
import { user } from './user';
import { users } from './users';

const Reducer = combineReducers({
    user: user,
    users: users,
});

export default Reducer;
