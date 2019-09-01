import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import { updateProfileSuccess } from './actions';

export function* updateProfile({ payload }) {
  const { username, email, ...rest } = payload;

  const profile = Object.assign(
    { username, email },
    rest.password_old ? rest : {}
  );

  try {
    const response = yield call(api.put, `/users`, profile);

    yield put(updateProfileSuccess(response.data));

    Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
  } catch (error) {
    Alert.alert(
      'Erro',
      'Houve um erro na atualização do perfil. Verifique seus dados.'
    );
  }
}

export default all([takeLatest('@USER/UPDATE_REQUEST', updateProfile)]);
