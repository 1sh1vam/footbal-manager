import { useMemo, useState } from 'react';
import ActionsMenu from '@/components/roster/ActionsMenu';
import EllipsisIcon from '@/assets/icons/ellipsis.svg?react';
import DeleteConfirm from '@/components/roster/DeleteConfirm';
import EditPlayerForm from './EditPlayerForm';
import { convertHeightToMeters } from '@/utils/csv';
import { useRosterContext } from '@/context/roster';
import { filterPlayers } from '@/utils/players';

type PlayerRosterProps = {
  playerFilterText?: string;
}

const columns = ['Player Name', 'Jersey Number', 'Starter', 'Position', 'Height', 'Weight', 'Nationality', 'Appearances', 'Minutes Played'];

const PlayersRoster = ({ playerFilterText }: PlayerRosterProps) => {
  const { players, deletePlayer, editPlayer } = useRosterContext();
  const [actionMenuId, setActionMenuId] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const closeActionMenu = () => setActionMenuId('');
  const openDeletePopup = () => setShowDeletePopup(true);
  const closeDeletePopup = () => setShowDeletePopup(false);
  const openEditFormPopup = () => setShowEditForm(true);
  const closeEditFormPopup = () => setShowEditForm(false);

  const renderCell = (index: number, cell: string) => {
    switch (index) {
      case 4: {
        const height = cell && cell.toLowerCase()
        return convertHeightToMeters(cell) + (height && height !== 'unknown' && height !== 'n/a' ? ' m' : '');
      }
      case 5: {
        const weight = cell && cell.toLowerCase().trim();
        return weight + (weight && weight !== 'unknown' && weight !== 'n/a' ? ' kg' : '');
      }
      default:
        return cell
    }
  }

  const filteredPlayers = useMemo(() => filterPlayers(players, playerFilterText),[players, playerFilterText]);
  const player = useMemo(() => filteredPlayers.find((player) => player.id === actionMenuId), [actionMenuId, filteredPlayers]);

  return (
    <div className="w-full px-5">
      <table className="text-content-2 font-medium font-poppins w-full">
        <thead>
          <tr className="text-left text-xs">
            {columns.map((column) => (
              <th key={column} className="font-medium pb-5">
                {column}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {filteredPlayers.map((player, index) => (
            <tr key={index}>
              {columns.map((column, index) => (
                <td key={column} className="font-medium pb-5">
                  <div className="flex flex-row items-center gap-2">
                    {index === 0 ? (
                      <img className="w-6 h-6" src={player["Flag Image"]} />
                    ) : null}
                    {renderCell(index, (player as any)[column])}
                  </div>
                </td>
              ))}
              <td className="pb-5 relative">
                <div
                  className="cursor-pointer"
                  onClick={() => setActionMenuId(player.id)}
                >
                  <EllipsisIcon />
                </div>
                {actionMenuId === player.id ? (
                  <ActionsMenu
                    closeActionMenu={closeActionMenu}
                    deletePlayer={openDeletePopup}
                    editPlayer={openEditFormPopup}
                  />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeletePopup && actionMenuId ? (
        <DeleteConfirm
          closeConfirmation={closeDeletePopup}
          handleDelete={() => deletePlayer(actionMenuId)}
        />
      ) : null}
      {showEditForm && player ? (
        <EditPlayerForm editPlayer={editPlayer} closeForm={closeEditFormPopup} player={player} />
      ) : null}
    </div>
  );
}

export default PlayersRoster