import { useState } from "react";
import Modal from "@/components/general/Modal";
import XIcon from "@/assets/icons/close.svg?react";
import Input from "@/components/inputs/Input";
import Label from "@/components/inputs/Label";
import CustomSelect from "@/components/inputs/CutomSelect";
import RadioButton from "@/components/inputs/RadioButton";
import Button from "@/components/buttons/Button";
import { Player } from "@/types/players";

type EditPlayerFormProps = {
  player: Player;
  editPlayer: (player: Player) => void;
  closeForm: () => void;
};

const options = [
  { label: "Goalkeeper", value: "Goalkeeper" },
  { label: "Defender", value: "Defender" },
  { label: "Midfielder", value: "Midfielder" },
  { label: "Forward", value: "Forward" },
];

const EditPlayerForm = ({ player, closeForm, editPlayer }: EditPlayerFormProps) => {
  const [modifiedPlayer, setModifiedPlayer] = useState<Player>(player);

  const handleChange = (fieldName: keyof Player, value: string) => {
    setModifiedPlayer((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSave = () => {
    editPlayer(modifiedPlayer);
    closeForm()
  }

  const allFieldsFilled = Object.values(modifiedPlayer).every((val) => !!val);

  return (
    <Modal
      wrapChildren
      wrapperClass="flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
    >
      <div className="w-[480px] flex flex-col p-6 rounded-lg bg-neutral-light shadow-[0px_12px_28px_0px_rgba(22,22,22,0.50)]">
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg font-semibold text-content-1">Are you sure?</p>
          <div onClick={closeForm} className="cursor-pointer text-content-2">
            <XIcon />
          </div>
        </div>
        <div className="flex flex-col gap-4 py-6">
          <div className="flex flex-row items-center gap-4">
            <Input
              value={modifiedPlayer["Player Name"]}
              onChange={({ target }) =>
                handleChange("Player Name", target.value)
              }
              containerClass="w-[274px]"
              label="Player Name"
            />
            <Input
              value={modifiedPlayer["Jersey Number"]}
              onChange={({ target }) =>
                handleChange("Jersey Number", target.value)
              }
              containerClass="w-[142px]"
              label="Jersey Number"
            />
          </div>
          <div className="flex flex-row items-center gap-4">
            <Input
              value={modifiedPlayer["Height"]}
              onChange={({ target }) => handleChange("Height", target.value)}
              label="Height"
            />
            <Input
              value={modifiedPlayer["Weight"]}
              onChange={({ target }) => handleChange("Weight", target.value)}
              label="Weight"
            />
          </div>
          <Label containerClass="w-full" text="Position">
            <CustomSelect
              options={options}
              defaultOption={modifiedPlayer['Position']}
              onChange={(val) => handleChange("Position", val)}
            />
          </Label>
          <Label containerClass="w-full" labelClass="mb-4" text="Starter">
            <div className="flex flex-row items-center gap-4">
              <RadioButton
                label="No"
                checked={modifiedPlayer["Starter"] === "No"}
                value="No"
                onChange={(val) => handleChange("Starter", val)}
              />
              <RadioButton
                label="Yes"
                value="Yes"
                checked={modifiedPlayer["Starter"] === "Yes"}
                onChange={(val) => handleChange("Starter", val)}
              />
            </div>
          </Label>
        </div>
        <Button onClick={handleSave} disabled={!allFieldsFilled} className="self-end">Edit Player</Button>
      </div>
    </Modal>
  );
};

export default EditPlayerForm;
