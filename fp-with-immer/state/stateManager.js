import { createInitialHistory, undoAction, redoAction } from "./history.js";
import { dispatchAction } from "./dispatch.js";
import { createLogger } from "./logger.js";

export const createStore = (initialState, reducer) => {
  let history = createInitialHistory(initialState);
  const logger = createLogger("Store");

  return {
    getState: () => history.present,

    dispatch: (event) => {
      history = dispatchAction(history, reducer, event, logger);
      return history.present;
    },

    undo: () => {
      history = undoAction(history);
      return history.present;
    },

    redo: () => {
      history = redoAction(history);
      return history.present;
    },
  };
};
