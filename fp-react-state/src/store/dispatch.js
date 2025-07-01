export const dispatchAction = (history, reducer, event, logger) => {
  logger(event);

  const newPresent = reducer(history.present, event);

  return {
    past: [...history.past, history.present],
    present: newPresent,
    future: [],
  };
};
