import { Player } from "@/types/players";
import PlayerImg from "@/assets/images/player-picture.png";
import Image from "@/components/general/Image";
import PlayerBasicInfo from "@/components/formation/PlayerBasicInfo";
import { convertHeightToMeters } from "@/utils/csv";
import PlayerStat from "@/components/formation/PlayerStat";

type PlayerDetailsProps = {
  player?: Player;
  isValidFormation?: boolean;
};

const PlayerDetails = ({ player, isValidFormation = false }: PlayerDetailsProps) => {
  if (!player || !isValidFormation) return;

  console.log('player', player)

  let height = player["Height"] && player["Height"].toLowerCase();
  height =
    convertHeightToMeters(height) +
    (height && height !== "unknown" && height !== "n/a" ? " m" : "");

  let weight = player["Weight"] && player["Weight"].toLowerCase().trim();
  weight =
    weight + (weight && weight !== "unknown" && weight !== "n/a" ? " kg" : "");

  return (
    <div className="flex-1 min-w-[322px] bg-neutral-dark rounded p-6 relative">
      <Image
        className="absolute left-1/2 -translate-x-1/2 h-[258px]"
        src={player["Player Image"]}
        fallbackSrc={PlayerImg}
        alt="Player"
      />
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center relative">
          <span className="text-[109.714px] leading-[100px] font-semibold text-[#3A3731] opacity-50">
            {player["Jersey Number"]}
          </span>
          <span className="absolute left-[5px] text-[41.143px] font-semibold text-primary-orange">
            {player["Jersey Number"]}
          </span>
        </div>
        <div className="flex flex-col gap-6 z-[1]">
          <div>
            <p className="text-2xl font-medium text-white">
              {player["Player Name"]}
            </p>
            <p className="text-lg font-semibold text-primary-orange">
              {player["Position"]}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <PlayerBasicInfo label="Height" value={height} />
            <PlayerBasicInfo label="Weight" value={weight} />
            <PlayerBasicInfo
              label="Nationality"
              value={player["Nationality"]}
              imgSrc={player["Flag Image"]}
            />
          </div>
          <div className="h-[1px] bg-outline" />
          <div className="grid grid-cols-2 gap-x-[55px] gap-y-4">
            <PlayerStat statTitle="Appearances" stat={player["Appearances"]} />
            <PlayerStat
              statTitle="Minutes Played"
              stat={player["Minutes Played"]}
            />
            {player["Position"] === "Goalkeeper" ? (
              <>
                <PlayerStat
                  statTitle="Clean sheets"
                  stat={player["Clean Sheets"]}
                />
                <PlayerStat statTitle="Saves" stat={player["Saves"]} />
              </>
            ) : (
              <>
                <PlayerStat statTitle="Goals" stat={player["Goals"]} />
                <PlayerStat statTitle="Assists" stat={player["Assists"]} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;
