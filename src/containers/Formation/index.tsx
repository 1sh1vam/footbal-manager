import { useState, useMemo } from "react";
import ContentBox from "@/components/general/ContentBox";
import TeamName from "@/components/general/TeamName";
import { useRosterContext } from "@/context/roster";
import FormationField from "./FormationField";
import { Player } from "@/types/players";
import InvalidFormationModal from "@/components/formation/InvalidFormationModal";
import { getStartersByPosition, validateFormation } from "@/utils/players";
import PlayerDetails from "./PlayerDetails";

const invalidFomrations = [
  {
    title: "Not enough starters",
    desc: "Your team doesn’t have enough starters  for one or more of the positions in the 4-3-3 formation",
  },
  {
    title: "There are too many starters",
    desc: "Your team has too many starters for one or more of the positions in the 4-3-3 formation.",
  },
];

const Formation = () => {
  const { players, teamName, changeTeamName } = useRosterContext();
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();

  const startersByPosition = useMemo(
    () => getStartersByPosition(players),
    [players]
  );

  const { isValidFormation, isEnoughStarters, isNotTooManyStarters } =
    validateFormation(startersByPosition);

  let invalidFomration;
  if (!isEnoughStarters) {
    invalidFomration = invalidFomrations[0];
  } else if (!isNotTooManyStarters) {
    invalidFomration = invalidFomrations[1];
  }

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <TeamName
          saveTeamName={changeTeamName}
          label="Roster Details"
          teamName={teamName || "My Team"}
          nameUpdated={!!teamName}
        />
      </div>
      <ContentBox className="p-8 flex flex-row items-stretch gap-8 overflow-x-auto">
        <FormationField
          handleSelectPlayer={(player) => setSelectedPlayer(player)}
          selectedPlayer={selectedPlayer || startersByPosition.goalkeeper[0]}
          startersByPosition={startersByPosition}
          isValidFormation={isValidFormation}
        />
        <PlayerDetails
          player={selectedPlayer || startersByPosition.goalkeeper[0]}
          isValidFormation={isValidFormation}
        />
      </ContentBox>
      {!isValidFormation ? (
        <InvalidFormationModal
          title={invalidFomration!.title}
          desc={invalidFomration!.desc}
        />
      ) : null}
    </div>
  );
};

export default Formation;
