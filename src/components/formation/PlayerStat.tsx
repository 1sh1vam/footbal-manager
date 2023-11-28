type PlayerStatProps = {
  statTitle: string;
  stat: string;
}

const PlayerStat = ({ statTitle, stat }: PlayerStatProps) => {
  return (
    <div>
        <p className="text-2xl font-semibold text-primary-orange">{stat}</p>
        <p className="text-xs text-content-2">{statTitle}</p>
    </div>
  )
}

export default PlayerStat