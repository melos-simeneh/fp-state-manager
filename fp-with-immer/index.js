import { enablePatches } from "immer";
enablePatches();

import { createStore } from "./state/stateManager.js";
import { StateReducer } from "./state/reducer.js";

const msg = "🔧 Functional State Manager (Using Immer)";
const length = [...msg].length;
console.log("\n" + "=".repeat(length + 2));
console.log(msg);
console.log("=".repeat(length + 2));

const appState = { items: [] };
const store = createStore(appState, StateReducer);

store.dispatch({ type: "ADD_ITEM", payload: "apple" });
store.dispatch({ type: "ADD_ITEM", payload: "banana" });
store.dispatch({ type: "REMOVE_ITEM", payload: "apple" });

console.log("\n🛒 Current store state:");
console.table(store.getState().items);

store.undo();
console.log("\n↩️  After undo — current items:");
console.table(store.getState().items);

store.redo();
console.log("\n↪️  After redo — current items:");
console.table(store.getState().items);
