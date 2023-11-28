import FieldImage from "@/assets/images/Field.png";
import PlayerGroup from "@/components/formation/PlayerGroup";
import { StartersByPositionT } from "@/utils/players";
import { Player } from "@/types/players";

type FormationFieldProps = {
  startersByPosition: StartersByPositionT;
  isValidFormation: boolean;
  selectedPlayer: Player;
  handleSelectPlayer: (player: Player) => void;
};

const FormationField = ({
  startersByPosition,
  handleSelectPlayer,
  isValidFormation,
  selectedPlayer,
}: FormationFieldProps) => {
  const renderPlayerGroup = (player: Player, className: string) => {
    return (
      <PlayerGroup
        handleClick={() => handleSelectPlayer(player)}
        isFocused={player.id === selectedPlayer.id}
        playerName={player["Player Name"]}
        jerseyNo={player["Jersey Number"]}
        className={className}
      />
    );
  };
  return (
    <div className="h-full relative">
      <img className="w-auto h-full" src={FieldImage} />
      {isValidFormation ? (
        <>
          {renderPlayerGroup(
            startersByPosition.goalkeeper[0],
            "top-1/2 left-[6.25%] -translate-y-4"
          )}

          {/* Defenders */}
          {renderPlayerGroup(
            startersByPosition.defender[0],
            "top-[10.35%] left-[25.03%]"
          )}
          {renderPlayerGroup(
            startersByPosition.defender[1],
            "top-[31.98%] left-[23.79%]"
          )}
          {renderPlayerGroup(
            startersByPosition.defender[2],
            "bottom-[31.98%] left-[23.79%]"
          )}
          {renderPlayerGroup(
            startersByPosition.defender[3],
            "bottom-[10.35%] left-[25.03%]"
          )}

          {/* Midfielders */}
          {renderPlayerGroup(
            startersByPosition.midfielder[0],
            "top-[17.37%] left-1/2 -translate-y-4 -translate-x-4"
          )}
          {renderPlayerGroup(
            startersByPosition.midfielder[1],
            "top-1/2 left-1/2 -translate-y-4 -translate-x-4"
          )}
          {renderPlayerGroup(
            startersByPosition.midfielder[2],
            "bottom-[17.37%] left-1/2 translate-y-4 -translate-x-4"
          )}

          {/* Strikers */}
          {renderPlayerGroup(
            startersByPosition.forward[0],
            "left-[68.90%] top-[21.44%]"
          )}
          {renderPlayerGroup(
            startersByPosition.forward[1],
            "left-[71.62%] top-1/2 -translate-y-4"
          )}
          {renderPlayerGroup(
            startersByPosition.forward[2],
            "left-[68.90%] bottom-[21.44%]"
          )}
        </>
      ) : null}
    </div>
  );
};

export default FormationField;
