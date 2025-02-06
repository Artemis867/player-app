

type PlayerDetail = {
  pointsPerGame: number;
  reboundsDefensivePerGame: number;
  assistsPerGame: number;
  fieldGoalsEffectivePercentage: number;
};

interface HighlightStatsCardProps {
  playerDetail: PlayerDetail;
}

export default function HighlightStatsCard({ playerDetail }: HighlightStatsCardProps) {
  return (
    <div className="w-[320px] h-[100px] border rounded-md border-indigo-600 p-1">
      <div className="text-center bg-blue-800">
        <span className="text-xs text-white font-semibold">Overall Stats</span>
      </div>
      <div className="text-center">
        <span className="p-3 pt-0 m-3 text-xs">PTS</span>
        <span className="p-3 pt-0 m-3 text-xs">REB</span>
        <span className="p-3 pt-0 m-3 text-xs">AST</span>
        <span className="p-3 pt-0 m-3 text-xs">FG%</span>
      </div>
      <div className="text-center">
        <span className="p-2 pt-0 m-2 text-xl font-bold tracking-tight">{playerDetail.pointsPerGame.toFixed(1) ?? "-"}</span>
        <span className="p-2 pt-0 m-2 text-xl font-bold tracking-tight">{playerDetail.reboundsDefensivePerGame.toFixed(1) ?? "-"}</span>
        <span className="p-2 pt-0 m-2 text-xl font-bold tracking-tight">{playerDetail.assistsPerGame.toFixed(1) ?? "-"}</span>
        <span className="p-2 pt-0 m-2 text-xl font-bold tracking-tight">{playerDetail.fieldGoalsEffectivePercentage.toFixed(1) ?? "-"}</span>
      </div> 
    </div>
  );
}