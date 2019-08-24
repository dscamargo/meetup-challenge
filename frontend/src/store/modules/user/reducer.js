import produce from "immer";

const INITIAL_STATE = {
  id: null,
  password: null,
  password_confirmation: null,
  password_old: null,
  loading: false
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@USER/UPDATE_REQUEST":
        draft.loading = true;
        break;
      case "@USER/UPDATE_SUCCESS":
        draft.loading = false;
        break;

      default:
        return state;
    }
  });
}
