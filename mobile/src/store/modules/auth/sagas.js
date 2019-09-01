import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import { signinSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield call(api.post, '/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    yield put(signinSuccess(token, user));

    if (token !== null) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    Alert.alert('Erro ao realizar login', error.response.data.message);

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push("/signin");
}

export default all([
  takeLatest('@AUTH/SIGN_IN_REQUEST', signIn),
  takeLatest('@AUTH/SIGN_OUT', signOut),
  takeLatest('persist/REHYDRATE', setToken),
]);
