import { useFetchCharacterByIdQuery } from "../features/apis/api-slice";

interface ICharacterDetailProps {
    characterId: number;
    resetCharacter: (id: number) => void
}

export const CharacterDetail = ({characterId, resetCharacter}: ICharacterDetailProps) => {
  const {
    data: character,
    error,
    isLoading,
  } = useFetchCharacterByIdQuery(characterId);

  if (isLoading) {
    return (
      <div>
        <button disabled>
            Loading Character...
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "red" }}>Error fetching post </div>
    );
  }

  return (
    <article>
        <button onClick={() => resetCharacter(-1)}>
          Go back
        </button>
      <div>
        <img src={character?.image} alt="Character image" height={250} />
      </div>
      <div style={{ fontSize: 20, color: "white", fontWeight: 700 }}>
        {character?.name}
      </div>
    </article>
  );
};
