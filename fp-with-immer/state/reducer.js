import { produce } from "immer";

export const StateReducer = (state, event) =>
  produce(state, (draft) => {
    switch (event.type) {
      case "ADD_ITEM":
        draft.items.push(event.payload);
        break;
      case "REMOVE_ITEM":
        draft.items = draft.items.filter((item) => item !== event.payload);
        break;
    }
  });
