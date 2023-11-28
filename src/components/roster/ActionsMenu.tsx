import XIcon from '@/assets/icons/close.svg?react';
import PencilIcon from '@/assets/icons/pencil.svg?react';
import DeleteIcon from '@/assets/icons/delete.svg?react';

type ActionsMenuProps = {
  closeActionMenu?: () => void;
  editPlayer?: () => void;
  deletePlayer?: () => void;
}

const ActionsMenu = ({ closeActionMenu, editPlayer, deletePlayer }: ActionsMenuProps) => {
  return (
    <div className="z-[1] absolute -top-[18px] -right-2 w-[233px] p-4 pb-6 rounded bg-neutral-light shadow-[0px_12px_28px_0px_rgba(22,22,22,0.50)]">
        <div className="flex flex-row justify-between items-center">
            <p className="text-lg font-semibold text-content-1">Actions</p>
            <div onClick={closeActionMenu} className="cursor-pointer text-content-2">
                <XIcon />
            </div>
        </div>
        <div onClick={editPlayer} className="py-2 flex flex-row items-center gap-2 text-sm text-content-2 cursor-pointer">
          <div className="text-content-3">
            <PencilIcon />
          </div>
          <p>Edit Player</p>
        </div>
        <div onClick={deletePlayer} className="mt-1 py-2 flex flex-row items-center gap-2 text-sm text-content-2 cursor-pointer">
          <DeleteIcon />
          <p>Delete Player</p>
        </div>
    </div>
  )
}

export default ActionsMenu