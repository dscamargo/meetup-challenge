import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import { updateProfileSuccess } from './actions';

export function* updateProfile({ payload }) {
  const { id, password_old, password, password_confirmation } = payload;

  try {
    yield call(api.put, `/users/${id}`, {
      password_old,
      password,
      password_confirmation,
    });

    yield put(updateProfileSuccess());

    Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
    // history.push("/");
  } catch (error) {
    Alert.alert(
      'Erro',
      'Houve um erro na atualização do perfil. Verifique seus dados.'
    );
  }
}

export default all([takeLatest('@USER/UPDATE_REQUEST', updateProfile)]);
