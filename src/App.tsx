import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks';
import { addAmount, incremented } from './features/counter/counter-slice';
import { useFetchCharactersQuery } from './features/apis/api-slice';

function App() {
  const dispatch = useAppDispatch();
  const [gender, setGender] = useState('male');
  const count = useAppSelector((state) => state.counter.value);

  const { data, isFetching } = useFetchCharactersQuery(gender);
  
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
      <div>
        <p>Character grade selected:</p>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
        </select>
      </div>
      <div>
        {
          isFetching && (<div>Loading data......</div>)
        }
        <p>Number of characters: {data?.results.length}</p>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              data?.results.map((character) => (
                <tr key={character.id}>
                  <td>{character.name}</td>
                  <td>
                    <img src={character.image} alt="Character image" height={250} />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
