import Button from "@/components/buttons/Button";
import ContentBox from "@/components/general/ContentBox";
import TeamName from "@/components/general/TeamName";
import SearchBox from "@/components/inputs/SearchBox";
import EmptyRoster from "./EmptyRoster";
import RosterImportModal from "./RosterImportModal";
import { useState } from "react";
import { useRosterContext } from "@/context/roster";
import PlayersRoster from "./PlayersRoster";

const Roster = () => {
  const { players, teamName, changeTeamName } = useRosterContext();

  const [playerFilterText, setPlayerFilterText] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  const openImportModal = () => setShowImportModal(true);

  const playersImported = players.length;
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <TeamName
          saveTeamName={changeTeamName}
          label="Roster Details"
          teamName={teamName || "My Team"}
          nameUpdated={!!teamName}
        />
        <div className="flex flex-row items-center space-x-2">
          <SearchBox
            searchPlayer={(val) => setPlayerFilterText(val)}
            clearSearch={() => setPlayerFilterText("")}
            placeholder="Find Player"
          />
          <Button
            variant={playersImported ? "outlined" : "solid"}
            onClick={openImportModal}
          >
            {playersImported ? "Re-Import Team" : "Import Team"}
          </Button>
        </div>
      </div>
      <ContentBox className="overflow-auto py-[13px]">
        {players.length ? (
          <PlayersRoster playerFilterText={playerFilterText} />
        ) : (
          <EmptyRoster importRoster={openImportModal} />
        )}
      </ContentBox>
      {showImportModal ? (
        <RosterImportModal closeModal={() => setShowImportModal(false)} />
      ) : null}
    </div>
  );
};

export default Roster;
