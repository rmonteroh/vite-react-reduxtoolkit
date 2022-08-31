import React from "react";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { apiSlice } from '../features/apis/api-slice';
import { CharacterItem } from '../components';
import {
  ICharacter,
  useFetchCharactersQuery,
  useLazyFetchCharactersQuery,
} from "../features/apis/api-slice";

interface ICharacterProps {
  selectedCharacter: (id: number) => void;
}

export const Characters = ({ selectedCharacter }: ICharacterProps) => {
  const [gender, setGender] = useState("male");
  const { data, isFetching, isLoading, isUninitialized } =
    useFetchCharactersQuery(gender, {
      // Revalidate cache data in background
      // We can add a number by value to revalidate after # of seconds selected
      // refetchOnMountOrArgChange: true, // or pass number of seconds ex: 5

      // Revalidate data when user put focus on page with this component
      // refetchOnFocus: true,

      // Revalidate the server data when lost and reconnect to internet to check is the cache data is equal to server data
      // refetchOnReconnect: true,

      // Set polling mechanism to revalidate data and compare server data with cache data
      // This values is in milliseconds
      //pollingInterval: 3000

      // This value allow us to not execute this request immediately
      // We chan check the status of this query with isUninitialized param
      // skip: true
    });

  // The lazy hook is by default in status initialized
  /*  const [trigger, { data, isFetching, isLoading, isUninitialized }] =
    useLazyFetchCharactersQuery({
      refetchOnReconnect: true,
    }); */


  return (
    <div>
      <div>
        <p>Character grade selected:</p>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
        </select>
      </div>
      <div>
        <>
          {isLoading && <div>Loading data......</div>}
          {isFetching && console.info("Revalidating in background")}
        </>
        <p>Number of characters: {data?.results.length}</p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {data?.results.map((character: ICharacter) => (
            <CharacterItem key={character.id} character={character} selectedCharacter={selectedCharacter} />
          ))}
        </div>
      </div>
      {/* {isUninitialized && (
        <button onClick={() => trigger(gender)}>Fetch characters</button>
      )} */}
    </div>
  );
};

