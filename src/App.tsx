import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks';
import { addAmount, incremented } from './features/counter/counter-slice';
import { CharacterDetail, Characters } from './components';

function App() {
  const dispatch = useAppDispatch();
  const [characterId, setCharacterId] = useState(-1);
  const count = useAppSelector((state) => state.counter.value);
  
  const add = () => {
    dispatch(incremented());
  }

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
        <button onClick={() => add()}>
          count is {count}
        </button>
        <button onClick={() => dispatch(addAmount(4))}>
          increasedBy 4: {count}
        </button>
      </div>
      {
        characterId > -1 ? <CharacterDetail characterId={characterId} resetCharacter={setCharacterId} /> : <Characters selectedCharacter={setCharacterId} />
      }

     {/*  <div>
        <p>Character grade selected:</p>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
        </select>
      </div>
      <div>
        {
          isLoading && (<div>Loading data......</div>)
        }
        <p>Number of characters: {data?.results.length}</p>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {
            data?.results.map((character) => (
              <div style={{marginBottom: 20, cursor: 'pointer'}} key={character.id}>
                <div>
                  <img src={character.image} alt="Character image" height={250} />
                </div>
                <div style={{fontSize: 20, color: 'white', fontWeight: 700}}>{character.name}</div>
              </div>
            ))
          }
        </div>
      </div> */}
    </div>
  )
}

export default App
