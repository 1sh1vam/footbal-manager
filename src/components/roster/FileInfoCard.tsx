type FileInfoProps = {
  label: string;
  value: string | number;
};

const FileInfoCard = ({ label, value }: FileInfoProps) => {
  return (
    <div className="w-[150px] text-content-2">
      <p className="text-sm mb-2">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
};

export default FileInfoCard;
