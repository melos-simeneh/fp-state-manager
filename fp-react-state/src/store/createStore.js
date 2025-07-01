export const createStore = (initialState, reducer) => {
  let history = {
    past: [],
    present: initialState,
    future: [],
  };

  const getState = () => history.present;

  const dispatch = (action) => {
    // Update present state
    const newPresent = reducer(history.present, action);

    // Update history
    history = {
      past: [...history.past, history.present],
      present: newPresent,
      future: [],
    };

    return history.present;
  };

  const undo = () => {
    if (history.past.length === 0) return history.present;

    const previous = history.past[history.past.length - 1];
    history = {
      past: history.past.slice(0, -1),
      present: previous,
      future: [history.present, ...history.future],
    };

    return history.present;
  };

  const redo = () => {
    if (history.future.length === 0) return history.present;

    const next = history.future[0];
    history = {
      past: [...history.past, history.present],
      present: next,
      future: history.future.slice(1),
    };

    return history.present;
  };

  return {
    getState,
    dispatch,
    undo,
    redo,
    getHistory: () => history, // Helper to access history
  };
};
