import { all, takeLatest, call, put } from "redux-saga/effects";

import api from "../../../services/api";
import history from "../../../services/history";

import { updateProfileSuccess } from "./actions";
import { toast } from "react-toastify";

export function* updateProfile({ payload }) {
  const { id, password_old, password, password_confirmation } = payload;

  try {
    yield call(api.put, `/users/${id}`, {
      password_old,
      password,
      password_confirmation
    });

    yield put(updateProfileSuccess());
    toast.info("Suas informações foram alteradas com sucesso !", {
      position: toast.POSITION.TOP_RIGHT
    });
    history.push("/");
  } catch (error) {
    toast.error("Senha incorreta !", {
      position: toast.POSITION.TOP_RIGHT
    });
  }
}

export default all([takeLatest("@USER/UPDATE_REQUEST", updateProfile)]);
