// import createStore from "./cannonreactstate/createStore";
import { createStore } from "@cannonui/reactstate";
import type { apiStore } from "@cannonui/reactstate";
// import type { apiStore } from "./cannonreactstate/createStore";
interface store {
  val: number;
  inc: () => void;
  dec: () => void;
  reset: () => void;
}
const store = createStore((set: apiStore<store>["set"]) => ({
  val: 1,
  inc: () => set((state: store) => ({ val: state.val + 1 })),
  dec: () => set((state: store) => ({ val: state.val - 1 })),
  reset: () =>
    set((state: store) => ({
      val: 0,
    })),
}));
export type { store };
export default store;
