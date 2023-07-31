import { useSyncExternalStore } from "react";
import type { apiStore } from "./createStore";
const useStore = <T>(
  api: Pick<apiStore<T>, "get" | "set" | "subscribe" | "unsubscribe">
): T => {
  return useSyncExternalStore(api.subscribe, api.get, api.get);
};

export default useStore;
