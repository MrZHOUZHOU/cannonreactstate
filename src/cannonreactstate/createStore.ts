interface apiStore<T> {
  listener: (nextState: T | Partial<T>, state: T) => void;
  subscribe: (listener: apiStore<T>["listener"]) => () => void;
  unsubscribe: () => void;
  get: () => T;
  set: (fn: ((state: T) => Partial<T> | T) | T | Partial<T>) => void;
}
type middleware = <T>(state: T) => T;
interface apiStoreConfig {
  middlewares?: middleware[];
}

const createStore = <T>(
  initState: (set: apiStore<T>["set"], get?: apiStore<T>["get"]) => T,
  config: apiStoreConfig = {}
): Pick<apiStore<T>, "get" | "set" | "subscribe" | "unsubscribe"> => {
  let state: T;
  const listeners: Set<apiStore<T>["listener"]> = new Set();
  const subscribe = (listener: apiStore<T>["listener"]) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };
  const get = () => state;

  const unsubscribe = () => {
    listeners.clear();
  };
  const set: apiStore<T>["set"] = async (fn) => {
    let nextState: T | Partial<T>;
    if (typeof fn === "function") {
      nextState = (fn as Function)(state);
    } else {
      nextState = fn;
    }
    const { middlewares = [] } = config;
    for (const middleware of middlewares) {
      nextState = await middleware(nextState);
    }
    if (!Object.is(nextState, state)) {
      state = Object.assign({}, state, nextState);
      for (const listener of listeners) {
        listener(nextState, state);
      }
    }
  };
  state = initState(set);

  return {
    subscribe,
    unsubscribe,
    get,
    set,
  };
};
export type { apiStore };
export default createStore;
