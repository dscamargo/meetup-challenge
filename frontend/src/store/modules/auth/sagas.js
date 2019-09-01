import { all, takeLatest, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import api from "../../../services/api";
import history from "../../../services/history";

import { signinSuccess, signFailure } from "./actions";

export function* signIn({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield call(api.post, "/sessions", {
      email,
      password
    });

    const { token, user } = response.data;

    yield put(signinSuccess(token, user));

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    history.push("/");
    toast.info(`Bem vindo, ${user.username}.`, {
      position: toast.POSITION.TOP_RIGHT
    });
  } catch (error) {
    toast.error(error.response.data.message || "Internal server error", {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push("/signin");
}

export default all([
  takeLatest("@AUTH/SIGN_IN_REQUEST", signIn),
  takeLatest("@AUTH/SIGN_OUT", signOut),
  takeLatest("persist/REHYDRATE", setToken)
]);
