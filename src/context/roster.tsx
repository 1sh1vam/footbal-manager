import { Player } from '@/types/players';
import React, { useContext, useState } from 'react';

type RosterContextT = {
    players: Player[];
    teamName: string;
    changeTeamName: (name: string) => void;
    savePlayers: (players: Player[]) => void;
    editPlayer: (player: Player) => void;
    deletePlayer: (playerId: string) => void;
}

const initialState: Pick<RosterContextT, 'players' | 'teamName'> = {
    players: [],
    teamName: ''
};

const RosterContext = React.createContext(initialState as RosterContextT);

type RosterContextProviderProps = {
 children: React.ReactNode;
}

const RosterContextProvider = ({ children }: RosterContextProviderProps) => {
    const [players, setPlayers] = useState(initialState.players);
    const [teamName, setTeamName] = useState(initialState.teamName);

    const changeTeamName: RosterContextT['changeTeamName'] = (name) => setTeamName(name);

    const savePlayers: RosterContextT['savePlayers'] = (importedPlayers) => setPlayers(importedPlayers);

    const editPlayer: RosterContextT['editPlayer'] = (updatedPlayer) => {
        setPlayers((prev) => prev.map((player) => {
            if (player.id === updatedPlayer.id) {
                return updatedPlayer;
            }
            return player
        }))
    };

    const deletePlayer: RosterContextT['deletePlayer'] = (playerId) => {
        setPlayers((prev) => prev.filter((player) => player.id !== playerId))
    }

    return (
        <RosterContext.Provider value={{ players, savePlayers, editPlayer, deletePlayer, teamName, changeTeamName }}>
            {children}
        </RosterContext.Provider>
    )
}

export const useRosterContext = () => useContext(RosterContext);

export default RosterContextProvider;