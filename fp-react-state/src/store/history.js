export const createInitialHistory = (initialState) => ({
  past: [],
  present: initialState,
  future: [],
});

export const undoAction = (history) => {
  if (history.past.length === 0) return history;

  const newPresent = history.past[history.past.length - 1];
  const newPast = history.past.slice(0, -1);
  const newFuture = [history.present, ...history.future];

  return {
    past: newPast,
    present: newPresent,
    future: newFuture,
  };
};

export const redoAction = (history) => {
  if (history.future.length === 0) return history;

  const newPresent = history.future[0];
  const newFuture = history.future.slice(1);
  const newPast = [...history.past, history.present];

  return {
    past: newPast,
    present: newPresent,
    future: newFuture,
  };
};
