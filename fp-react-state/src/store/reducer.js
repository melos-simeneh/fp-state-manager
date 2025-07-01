export function StateReducer(state, event) {
  switch (event.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, event.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item !== event.payload),
      };
    default:
      return state;
  }
}
