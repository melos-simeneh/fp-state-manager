import { applyPatches } from "immer";

export const createInitialHistory = (initialState) => ({
  past: [],
  present: initialState,
  future: [],
});

export const undoAction = (history) => {
  if (history.past.length === 0) return history;

  const last = history.past[history.past.length - 1];
  const newPresent = applyPatches(history.present, last.patches);

  return {
    past: history.past.slice(0, -1),
    present: newPresent,
    future: [
      { patches: last.patches, state: history.present },
      ...history.future,
    ],
  };
};

export const redoAction = (history) => {
  if (history.future.length === 0) return history;

  const next = history.future[0];
  const newPresent = applyPatches(history.present, next.patches);

  return {
    past: [...history.past, { patches: next.patches }],
    present: newPresent,
    future: history.future.slice(1),
  };
};
