import React, { useState } from "react";
import { FaUndo, FaRedo, FaPlus, FaTrash } from "react-icons/fa";
import { createStore } from "./store/createStore";
import { StateReducer } from "./store/reducer";

const initialState = { items: [] };

export default function App() {
  const [input, setInput] = useState("");
  const [store] = useState(() => createStore(initialState, StateReducer));
  const [state, setState] = useState(store.getState());
  const [history, setHistory] = useState({
    past: 0,
    future: 0,
  });

  const updateState = (action) => {
    const newState = action();
    setState(newState);
    setHistory({
      past: store.getHistory().past.length,
      future: store.getHistory().future.length,
    });
    return newState;
  };

  const handleAdd = () => {
    if (input.trim()) {
      updateState(() => store.dispatch({ type: "ADD_ITEM", payload: input }));
      setInput("");
    }
  };

  const handleRemove = (item) => {
    updateState(() => store.dispatch({ type: "REMOVE_ITEM", payload: item }));
  };

  const handleUndo = () => {
    updateState(() => store.undo());
  };

  const handleRedo = () => {
    updateState(() => store.redo());
  };

  const canUndo = history.past > 0;
  const canRedo = history.future > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden md:max-w-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">FP State Manager</h1>
          <div className="flex gap-3">
            <button
              onClick={handleUndo}
              disabled={!canUndo}
              className={`p-2.5 rounded-lg transition-all ${
                canUndo
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                  : "bg-gray-50 text-gray-300 cursor-not-allowed"
              }`}
              title="Undo"
            >
              <FaUndo className="h-5 w-5" />
            </button>
            <button
              onClick={handleRedo}
              disabled={!canRedo}
              className={`p-2.5 rounded-lg transition-all ${
                canRedo
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                  : "bg-gray-50 text-gray-300 cursor-not-allowed"
              }`}
              title="Redo"
            >
              <FaRedo className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          <input
            className="flex-1 px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new item..."
            onKeyPress={(e) => e.key === "Enter" && handleAdd()}
          />
          <button
            onClick={handleAdd}
            className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <FaPlus className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Items List</h2>
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {state.items?.length || 0}{" "}
              {state.items?.length === 1 ? "item" : "items"}
            </span>
          </div>

          <ul className="space-y-3">
            {state.items?.map((item, idx) => (
              <li
                key={idx}
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex justify-between items-center"
              >
                <span className="text-gray-800 font-medium">{item}</span>
                <button
                  onClick={() => handleRemove(item)}
                  className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all shadow-sm flex items-center gap-2"
                >
                  <FaTrash className="h-3.5 w-3.5" />
                  <span className="text-sm">Remove</span>
                </button>
              </li>
            ))}
          </ul>

          {(!state.items || state.items.length === 0) && (
            <div className="text-center py-8 px-4 bg-gray-50 rounded-xl">
              <div className="text-gray-400 mb-2">No items yet</div>
              <div className="text-sm text-gray-500">
                Add your first item above
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Past Actions
              </h3>
              <div className="text-2xl font-bold text-blue-600">
                {history.past}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Future Actions
              </h3>
              <div className="text-2xl font-bold text-purple-600">
                {history.future}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
