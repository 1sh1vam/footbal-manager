type PlayerBasicInfoProps = {
  label: string;
  value: string;
  imgSrc?: string;
}

const PlayerBasicInfo = ({ label, value, imgSrc }: PlayerBasicInfoProps) => {
  return (
    <div className="text-xs">
        <p className="text-content-2 mb-2">{label}</p>
        <div className="flex flex-row items-center gap-2.5">
            {imgSrc ? <img className="w-4 h-4" src={imgSrc} /> : null}
            <p className="text-sm font-medium text-content-1">{value}</p>
        </div>
    </div>
  )
}

export default PlayerBasicInfo;