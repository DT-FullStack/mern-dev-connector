import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS, AUTH_ERROR, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from "./types";
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR })
  }
}

export const register = ({ name, email, password }) => async dispatch => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      for (let err of errors) { dispatch(setAlert(err.msg, 'danger')) }
    }
    dispatch({ type: REGISTER_FAIL })
  }
}
export const login = ({ email, password }) => async dispatch => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      for (let err of errors) { dispatch(setAlert(err.msg, 'danger')) }
    }
    dispatch({ type: LOGIN_FAIL })
  }
}

export const logout = () => async dispatch => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
}