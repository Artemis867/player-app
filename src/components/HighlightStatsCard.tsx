import React from "react";
import { checkValidValue } from "@/common/players.common";

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
      <div className="text-center flex justify-center">
        <span className="flex-1 mt-2 text-xs">PTS</span>
        <span className="flex-1 mt-2 text-xs">REB</span>
        <span className="flex-1 mt-2 text-xs">AST</span>
        <span className="flex-1 mt-2 text-xs">FG%</span>
      </div>
      <div className="text-center flex justify-center">
        <span className="flex-1 mt-1 text-xl font-bold tracking-tight">{checkValidValue(playerDetail.pointsPerGame)}</span>
        <span className="flex-1 mt-1 text-xl font-bold tracking-tight">{checkValidValue(playerDetail.reboundsDefensivePerGame)}</span>
        <span className="flex-1 mt-1 text-xl font-bold tracking-tight">{checkValidValue(playerDetail.assistsPerGame)}</span>
        <span className="flex-1 mt-1 text-xl font-bold tracking-tight">{checkValidValue(playerDetail.fieldGoalsEffectivePercentage)}</span>
      </div> 
    </div>
  );
}