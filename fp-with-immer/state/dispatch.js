import { produceWithPatches } from "immer";

export const dispatchAction = (history, reducer, event, logger) => {
  logger(event);

  const [newPresent, patches, inversePatches] = produceWithPatches(
    history.present,
    (draft) => reducer(draft, event)
  );

  return {
    past: [...history.past, { patches: inversePatches }],
    present: newPresent,
    future: [],
  };
};
