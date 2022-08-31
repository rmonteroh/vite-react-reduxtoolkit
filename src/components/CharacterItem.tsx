import { ICharacter, apiSlice, selectCharacter } from '../features/apis/api-slice';
import { useSelector } from 'react-redux';
interface ICharacterItemProps {
  character: ICharacter;
  selectedCharacter: (id: number) => void;
}

export const CharacterItem = ({
  character,
  selectedCharacter,
}: ICharacterItemProps) => {
    const { isSuccess } = useSelector(selectCharacter(character.id));
  return (
    <div
      style={{ marginBottom: 20, cursor: "pointer" }}
      key={character.id}
      onClick={() => selectedCharacter(character.id)}
    >
      <div>
        <img src={character.image} alt="Character image" height={250} />
      </div>
      <div style={{ fontSize: 20, color: isSuccess ? 'green' : "white", fontWeight: 700 }}>
        {character.name}
      </div>
    </div>
  );
};
