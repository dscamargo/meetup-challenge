import { all, takeLatest, call, put } from "redux-saga/effects";

import api from "../../../services/api";
import history from "../../../services/history";

import { updateProfileSuccess } from "./actions";
import { toast } from "react-toastify";

export function* updateProfile({ payload }) {
  const { username, email, ...rest } = payload.data;

  const profile = Object.assign(
    { username, email },
    rest.password_old ? rest : {}
  );

  try {
    const response = yield call(api.put, `/users`, profile);

    yield put(updateProfileSuccess(response.data));
    toast.info("Perfil editado com sucesso !", {
      position: toast.POSITION.TOP_RIGHT
    });
    history.push("/");
  } catch (error) {
    toast.error(error.response.data.message || "Internal server error", {
      position: toast.POSITION.TOP_RIGHT
    });
  }
}

export default all([takeLatest("@USER/UPDATE_REQUEST", updateProfile)]);
