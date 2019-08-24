import produce from "immer";

const INITIAL_STATE = {
  token: null,
  isLogged: false,
  loading: false
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@AUTH/SIGN_IN_REQUEST":
        draft.loading = true;
        draft.error = false;
        break;

      case "@AUTH/SIGN_IN_SUCCESS":
        draft.token = action.payload.token;
        draft.isLogged = true;
        draft.loading = false;
        break;

      case "@AUTH/SIGN_FAILURE":
        draft.error = true;
        draft.loading = false;
        break;

      case "@AUTH/SIGN_OUT":
        draft.token = null;
        draft.isLogged = false;
        break;

      default:
        return state;
    }
  });
}
