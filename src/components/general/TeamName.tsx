import React, { useState } from "react";
import PencilIcon from '@/assets/icons/pencil.svg?react';

interface TeamNameProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  teamName: string;
  nameUpdated?: boolean;
  saveTeamName?: (name: string) => void;
}

const TeamName = ({ label, teamName, saveTeamName, nameUpdated = false }: TeamNameProps) => {
  const [teamNameInp, setTeamNameInp] = useState(teamName);
  const [enableEdit, setEnableEdit] = useState(false);

  const handleSaveTeamName = () => {
    setEnableEdit(false);
    if (saveTeamName) saveTeamName(teamNameInp);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSaveTeamName();
  };

  return (
    <div>
      <p className="text-xs font-medium leading-[18px] text-primary-orange mb-0.5">{label}</p>
      <div className="flex flex-row items-center group space-x-2">
        {enableEdit ? (
          <input
            autoFocus
            type="text"
            onKeyDown={handleKeyDown}
            value={teamNameInp}
            onChange={(e) => setTeamNameInp(e.target.value)}
            className="w-auto text-lg leading-6 font-semibold text-content-1 bg-transparent border-none outline-none"
          />
        ) : (
            <>
                <p className="text-content-1 text-lg font-semibold leading-6">{teamNameInp}</p>
                <div onClick={() => setEnableEdit(true)} className={`cursor-pointer text-content-1 ${nameUpdated ? 'hidden' : 'block'} group-hover:block`}>
                    <PencilIcon />
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default TeamName;
