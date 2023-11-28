import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type PlayerGroupProps = {
  jerseyNo: string;
  playerName: string;
  className?: string;
  isFocused?: boolean;
  handleClick?: () => void;
};

const PlayerGroup = ({ jerseyNo, playerName, handleClick, isFocused = false, className }: PlayerGroupProps) => {
  const classes = twMerge("absolute cursor-pointer text-content-1", className);

  const jerseyClasses = twMerge(
    'w-8 h-8 rounded-full bg-neutral-light border-[2px] border-content-2 font-semibold flex flex-row justify-center items-center',
    clsx({
      'bg-primary-orange': isFocused,
    })
  )

  return (
    <div onClick={handleClick} className={classes}>
      <div className={jerseyClasses}>
        {jerseyNo}
      </div>
      <div className="text-sm text-center -translate-x-[calc(50%-16px)] font-medium [text-shadow:_1px_1px_1px_rgb(0,0,0,0.2)]">
        {playerName}
      </div>
    </div>
  );
};

export default PlayerGroup;
