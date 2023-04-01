import { useEffect, useState } from "react";

export function useLocalStorage(key, initialState) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const items = localStorage.getItem(key);
    const tasks = JSON.parse(items);
    if (tasks) {
      setState(tasks);
    }
  }, []);

  useEffect(() => {
    if (state.length > 0) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state]);

  return [state, setState];
}
