import { enablePatches } from "immer";
enablePatches();

import { createStore } from "../state/stateManager.js";
import { StateReducer } from "../state/reducer.js";

describe("Functional State Manager with Immer", () => {
  let store;

  beforeEach(() => {
    const initialState = { items: [] };
    store = createStore(initialState, StateReducer);
  });

  test("should add items correctly", () => {
    store.dispatch({ type: "ADD_ITEM", payload: "apple" });
    store.dispatch({ type: "ADD_ITEM", payload: "banana" });

    expect(store.getState().items).toEqual(["apple", "banana"]);
  });

  test("should remove item correctly", () => {
    store.dispatch({ type: "ADD_ITEM", payload: "apple" });
    store.dispatch({ type: "REMOVE_ITEM", payload: "apple" });

    expect(store.getState().items).toEqual([]);
  });

  test("should undo the last action", () => {
    store.dispatch({ type: "ADD_ITEM", payload: "apple" });
    store.dispatch({ type: "ADD_ITEM", payload: "banana" });
    store.undo();

    expect(store.getState().items).toEqual(["apple"]);
  });

  test("should redo the undone action", () => {
    store.dispatch({ type: "ADD_ITEM", payload: "apple" });
    store.dispatch({ type: "ADD_ITEM", payload: "banana" });
    store.undo();
    store.redo();

    expect(store.getState().items).toEqual(["apple", "banana"]);
  });

  test("should not break if undo is called with no history", () => {
    store.undo();
    expect(store.getState().items).toEqual([]);
  });

  test("should not break if redo is called with no redo history", () => {
    store.redo();
    expect(store.getState().items).toEqual([]);
  });
});
