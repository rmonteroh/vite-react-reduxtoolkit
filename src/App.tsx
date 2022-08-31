import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { addAmount, incremented } from "./features/counter/counter-slice";
import { CharacterDetail, Characters } from "./components";

function App() {
  const dispatch = useAppDispatch();
  const [characterId, setCharacterId] = useState(-1);
  const count = useAppSelector((state) => state.counter.value);

  const add = () => {
    dispatch(incremented());
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Redux-toolkit</h1>
      <div className="card">
        <button onClick={() => add()}>count is {count}</button>
        <button onClick={() => dispatch(addAmount(4))}>
          increasedBy 4: {count}
        </button>
      </div>
      {characterId > -1 ? (
        <CharacterDetail
          characterId={characterId}
          resetCharacter={setCharacterId}
        />
      ) : (
        <Characters selectedCharacter={setCharacterId} />
      )}
    </div>
  );
}

export default App;
