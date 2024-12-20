export type ListFetchingError = { status: number; message: string };

// idle - initial
type IdleState = {
  state: LIST_STATE_VALUE["IDLE"];
};
// loading
type LoadingState = {
  state: LIST_STATE_VALUE["LOADING"];
};
// success
type SuccessStateObj<T> = {
  state: LIST_STATE_VALUE["SUCCESS"];
  result: T;
};

type SuccessStateArray<T> = {
  state: LIST_STATE_VALUE["ARRAY_SUCCESS"];
  result: T[];
};
// error
type ErrorState = {
  state: LIST_STATE_VALUE["ERROR"];
  error: ListFetchingError;
};

type LIST_STATE_VALUE = typeof LIST_STATE_VALUE;

export const LIST_STATE_VALUE = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ARRAY_SUCCESS: "ARRAY_SUCCESS",
  ERROR: "ERROR",
} as const;

export type ListStateValue = keyof typeof LIST_STATE_VALUE;

export type ComponentListState<T> =
  | IdleState
  | LoadingState
  | SuccessStateObj<T>
  | SuccessStateArray<T>
  | ErrorState;