export function updateProfileRequest(
  username,
  email,
  password,
  password_old,
  password_confirmation
) {
  return {
    type: '@USER/UPDATE_REQUEST',
    payload: { username, email, password, password_old, password_confirmation },
  };
}

export function updateProfileSuccess(user) {
  return {
    type: '@USER/UPDATE_SUCCESS',
    payload: { user },
  };
}
