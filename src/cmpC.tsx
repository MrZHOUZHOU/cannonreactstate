import useStore from "./cannonreactstate/main";
import store from "./store";

const CmpC = () => {
  const { val } = useStore(store);
  return <div>cmpC: {val}</div>;
};
export default CmpC;
