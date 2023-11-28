import Modal from '../general/Modal';
import WarningIcon from '@/assets/icons/triangle-exclamation.svg?react';

type InvalidFormationModalProps = {
  title: string;
  desc: string;
}

const InvalidFormationModal = ({ title, desc }: InvalidFormationModalProps) => {
  return (
    <Modal wrapChildren wrapperClass="left-[60px] w-[calc(100%-60px)] flex flex-row justify-center items-center">
        <div className="w-[389px] p-6 bg-neutral-light rounded-lg shadow-[0px_12px_28px_0px_rgba(22,22,22,0.50)]">
            <div className="flex flex-row items-center gap-2 mb-2">
                <WarningIcon />
                <p className="text-content-1 text-lg font-semibold">{title}</p>
            </div>
            <p className="text-sm text-content-2 text-center">{desc}</p>
        </div>
    </Modal>
  )
}

export default InvalidFormationModal