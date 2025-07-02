import { createInitialHistory, undoAction, redoAction } from "./history.js";
import { dispatchAction } from "./dispatch.js";
import { createLogger } from "./logger.js";

export const createStore = (initialState, reducer) => {
  let history = createInitialHistory(initialState);
  const logger = createLogger("Store");

  const getState = () => history.present;

  const dispatch = (event) => {
    history = dispatchAction(history, reducer, event, logger);
    return history.present;
  };

  const undo = () => {
    history = undoAction(history);
    return history.present;
  };

  const redo = () => {
    history = redoAction(history);
    return history.present;
  };
  return {
    getState,
    dispatch,
    undo,
    redo,
    getHistory: () => history,
  };
};
