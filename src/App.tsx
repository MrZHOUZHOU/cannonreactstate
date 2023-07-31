import "./App.css";
import useStore from "@cannonui/reactstate";
// import useStore from "./cannonreactstate/main";
import store from "./store";
import CmpA from "./cmpA";
import CmpC from "./cmpC";
function App() {
  const { inc, dec, reset } = useStore(store);
  return (
    <>
      <h1>Cannon + ReactState</h1>
      <CmpA />
      <CmpC />
      <div className="card">
        <button onClick={() => inc()}>inc</button>
        <button onClick={() => dec()}>dec</button>
        <button onClick={() => reset()}>reset</button>
      </div>
    </>
  );
}

export default App;
