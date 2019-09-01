export function updateProfileRequest(data) {
  return {
    type: "@USER/UPDATE_REQUEST",
    payload: { data }
  };
}

export function updateProfileSuccess(user) {
  return {
    type: "@USER/UPDATE_SUCCESS",
    payload: { user }
  };
}
