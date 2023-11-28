import XIcon from "@/assets/icons/close.svg?react";
import Button from "../buttons/Button";
import Modal from "../general/Modal";

type DeleteConfirmProps = {
  closeConfirmation: () => void;
  handleDelete?: () => void;
};

const DeleteConfirm = ({
  closeConfirmation,
  handleDelete,
}: DeleteConfirmProps) => {
  const confirm = () => {
    if (handleDelete) handleDelete();
    closeConfirmation();
  }
  return (
    <Modal
      wrapChildren
      wrapperClass="flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
    >
      <div className="w-[379px] flex flex-col gap-7 bg-neutral-light rounded p-6 pt-[18px] shadow-[0px_12px_28px_0px_rgba(22,22,22,0.50)]">
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg font-semibold text-content-1">Are you sure?</p>
          <div
            onClick={closeConfirmation}
            className="cursor-pointer text-content-2"
          >
            <XIcon />
          </div>
        </div>
        <p className="text-sm text-content-2">This can not be undone.</p>
        <div className="flex flex-row items-center gap-2 self-end">
          <Button onClick={closeConfirmation} variant="outlined">
            Cancel
          </Button>
          <Button
            className="bg-primary-red hover:bg-primary-orange-hover"
            onClick={confirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirm;
