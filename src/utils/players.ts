import { Player } from "@/types/players";

export const filterPlayers = (players: Player[], searchText?: string) => {
    if (!searchText) return players;

    const regex = new RegExp(searchText, 'i'); // 'i' flag for case-insensitive search

    return players.filter((player) => regex.test(player['Player Name']))
}

type StarterPositionKey = 'goalkeeper' | 'midfielder' | 'forward' | 'defender';
export type StartersByPositionT = {
    [key in StarterPositionKey]: Player[];
}

export const getStartersByPosition = (players: Player[]) => {
    const startersByPosition: StartersByPositionT = {
        goalkeeper: [],
        midfielder: [],
        forward: [],
        defender: []
    };
  
  // Loop through players and segregate starters by position
  players.forEach(player => {
    const { Position, Starter } = player;
    const positionKey = Position.toLowerCase();
  
    if (Starter.toLowerCase() === "yes") {
      if (positionKey === "goalkeeper") {
        startersByPosition.goalkeeper.push(player);
      } else if (positionKey === "midfielder") {
        startersByPosition.midfielder.push(player);
      } else if (positionKey === "forward") {
        startersByPosition.forward.push(player);
      } else if (positionKey === "defender") {
        startersByPosition.defender.push(player);
      }
    }
  });

  return startersByPosition;
}

export const validateFormation = (startersByPosition: StartersByPositionT) => {
    const requiredStarters: { [key: string]: number } = {
        goalkeeper: 1,
        defender: 4,
        midfielder: 3,
        forward: 3,
    };

    // Checking conditions
    const isEnoughStarters = Object.keys(requiredStarters).every((position) => {
        return startersByPosition[position as StarterPositionKey].length >= requiredStarters[position];
    });

    const isNotTooManyStarters = Object.keys(requiredStarters).every(position => {
        return startersByPosition[position as StarterPositionKey].length <= requiredStarters[position];
    });

    return { isEnoughStarters, isNotTooManyStarters, isValidFormation: isEnoughStarters && isNotTooManyStarters }
}
