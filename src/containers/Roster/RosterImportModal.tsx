import Modal from "@/components/general/Modal";
import XIcon from "@/assets/icons/close.svg?react";
import FilePicker from "@/components/inputs/FilePicker";
import { parseCSV } from "@/utils/csv";
import { convertToJSON } from "@/utils/csv";
import FileInfoCard from "@/components/roster/FileInfoCard";
import { useMemo, useState } from "react";
import Button from "@/components/buttons/Button";
import { useRosterContext } from "@/context/roster";
import { Player } from "@/types/players";

type RosterImportModalProps = {
  closeModal: () => void;
};

const RosterImportModal = ({ closeModal }: RosterImportModalProps) => {
  const { savePlayers } = useRosterContext();

  const [csvData, setCSVData] = useState<string[][] | undefined>(undefined);

  const { csvSummary, jsonData } = useMemo(
    () => convertToJSON(csvData),
    [csvData]
  );

  const handleFilePick = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        const text = event.target.result as string;
        const parsedData = parseCSV(text);
        setCSVData(parsedData);
      }
    };

    reader.readAsText(file);
  };

  const handleImportCsv = () => {
    savePlayers(jsonData as Player[])
    closeModal();
  }

  const error =
    (csvData && csvData.length < 2 || csvSummary.missingFields)
      ? "Your sheet is missing data. Please ensure all cells are filled out."
      : "";

  return (
    <Modal wrapChildren wrapperClass="flex items-center justify-center">
      <div className="w-[58.48%] h-[78.125%] bg-neutral-light rounded-lg p-6 pt-[18px] flex flex-col justify-between">
        <div>
          <div className="flex flex-row items-center justify-between border-b pb-4 mb-6 border-outline">
            <p className="text-lg text-content-1 font-semibold">Importer</p>
            <div onClick={closeModal} className="cursor-pointer text-content-1">
              <XIcon />
            </div>
          </div>
          <FilePicker
            error={error}
            handleFilePick={handleFilePick}
            label="Roster File"
          />
          {(csvData && !error) ? (
            <div className="mt-8">
              <p className="text-sm text-content-1 font-medium mb-6">
                File Summary
              </p>
              <div className="flex flex-row items-center overflow-x-auto">
                <FileInfoCard
                  label="Total Players"
                  value={csvSummary.totalPlayers}
                />
                <FileInfoCard
                  label="Goalkeepers"
                  value={csvSummary.goalKeepers}
                />
                <FileInfoCard label="Defenders" value={csvSummary.defenders} />
                <FileInfoCard
                  label="Midfielders"
                  value={csvSummary.midFielders}
                />
                <FileInfoCard label="Forwards" value={csvSummary.forwards} />
              </div>
            </div>
          ) : null}
        </div>
        <Button
          disabled={!!error || !csvData}
          variant={(error || !csvData) ? "ghost" : "solid"}
          className="self-end"
          onClick={handleImportCsv}
        >
          Import
        </Button>
      </div>
    </Modal>
  );
};

export default RosterImportModal;
