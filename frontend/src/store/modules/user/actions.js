export function updateProfileRequest(
  id,
  password,
  password_old,
  password_confirmation
) {
  return {
    type: "@USER/UPDATE_REQUEST",
    payload: { id, password, password_old, password_confirmation }
  };
}

export function updateProfileSuccess() {
  return {
    type: "@USER/UPDATE_SUCCESS"
  };
}
