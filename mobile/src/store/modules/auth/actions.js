export function signinRequest(email, password) {
  return {
    type: '@AUTH/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signinSuccess(token, user) {
  return {
    type: '@AUTH/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signOut() {
  return {
    type: '@AUTH/SIGN_OUT',
  };
}

export function signFailure() {
  return {
    type: '@AUTH/SIGN_FAILURE',
  };
}
