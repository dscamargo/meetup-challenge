import produce from "immer";

const INITIAL_STATE = {
  profile: null,
  id: null,
  password: null,
  password_confirmation: null,
  password_old: null,
  loading: false
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@AUTH/SIGN_IN_SUCCESS":
        draft.profile = action.payload.user;
        break;
      case "@USER/UPDATE_REQUEST":
        draft.loading = true;
        break;
      case "@USER/UPDATE_SUCCESS":
        draft.loading = false;
        draft.profile = action.payload.user;
        break;

      default:
        return state;
    }
  });
}
