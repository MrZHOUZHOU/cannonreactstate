import useStore from "./cannonreactstate/main";
import store from "./store";

const CmpA = () => {
  const { val } = useStore(store);
  return <div>cmpA: {val}</div>;
};
export default CmpA;
