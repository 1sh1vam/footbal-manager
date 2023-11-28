import Button from '@/components/buttons/Button';

type EmptyRosterProps = {
  importRoster?: () => void;
}

const columns = [
  "Player Name",
  "Jersey Number",
  "Position",
  "Height",
  "Weight",
  "Nationality",
];

const EmptyRoster = ({ importRoster }: EmptyRosterProps) => {
  return (
    <div className="h-full px-5 py-3 flex flex-col">
        <div className="flex flex-row items-center justify-between">
            {columns.map((column) => <p key={column} className="text-xs text-content-2 font-medium">{column}</p>)}
        </div>
        <div className="flex-1 flex flex-row items-center justify-center text-center">
            <div>
                <p className="text-sm text-content-2 mb-2">You do not have any players on the roster</p>
                <Button onClick={importRoster} variant="ghost">Import</Button>
            </div>
        </div>
    </div>
  )
}

export default EmptyRoster