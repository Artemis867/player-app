import { Separator } from "@/components/ui/separator";

interface Statistics {
  fieldGoalsMade: number | null;
  fieldGoalsEffectivePercentage: number | null;
  pointsThreeAttemptedPerGame: number | null;
  pointsThreePercentage: number | null;
  freeThrowsMadePerGame: number | null;
  freeThrowsPercentage: number | null;
  reboundsOffensivePerGame: number | null;
  reboundsDefensivePerGame: number | null;
  reboundsPerGame: number | null;
  assistsPerGame: number | null;
  blocksPerGame: number | null;
  stealsPerGame: number | null;
  foulsPersonalPerGame: number | null;
  turnoversPerGame: number | null;
  pointsPerGame: number | null;
}

interface Data {
  statistics: Statistics;
}

interface BoxStatsProps {
  index: number;
  seasonDates: any;
  data: Data;
}

export default function BoxStats({ index, seasonDates, data }: BoxStatsProps) {
  const checkValidValue = (data: number | null) => {
    if (data == null || data == undefined) {
      return 0;
    }
    return data;
  };

  return (
    <>
      <div key={index} className="flex gap-4 mt-4">
        <div className="flex-1 text-xs">{seasonDates && seasonDates[index]}</div>
        <div className="flex-1 text-xs">{checkValidValue(data.statistics.fieldGoalsMade)}</div>
        <div className="flex-1 text-xs">{checkValidValue(data.statistics.fieldGoalsEffectivePercentage).toFixed(1)}</div>
        <div className="flex-1 text-xs">{checkValidValue(data.statistics.pointsThreeAttemptedPerGame).toFixed(1)}</div>
        <div className="flex-1 text-xs">{checkValidValue(data.statistics.pointsThreePercentage).toFixed(1)}</div>
        <div className="flex-1 text-xs">{checkValidValue(data.statistics.freeThrowsMadePerGame).toFixed(1)}</div>
        <div className="flex-1 text-xs">{checkValidValue(data.statistics.freeThrowsPercentage).toFixed(1)}</div>
        <div className="flex-1 text-xs">{checkValidValue(data.statistics.reboundsOffensivePerGame).toFixed(1)}</div>
        <div className="flex-1 text-xs">{checkValidValue(data.statistics.reboundsDefensivePerGame).toFixed(1)}</div>
        <div className="flex-1 text-xs">{checkValidValue(data.statistics.reboundsPerGame).toFixed(1)}</div>
        <div className="flex-1 text-xs">{checkValidValue(data.statistics.assistsPerGame).toFixed(1)}</div>
        <div className="flex-1 text-xs">{checkValidValue(data.statistics.blocksPerGame).toFixed(1)}</div>
        <div className="flex-1 text-xs">{checkValidValue(data.statistics.stealsPerGame).toFixed(1)}</div>
        <div className="flex-1 text-xs">{checkValidValue(data.statistics.foulsPersonalPerGame).toFixed(1)}</div>
        <div className="flex-1 text-xs">{checkValidValue(data.statistics.turnoversPerGame).toFixed(1)}</div>
        <div className="flex-1 text-xs">{checkValidValue(data.statistics.pointsPerGame).toFixed(1)}</div>
      </div>
      <Separator />
    </>
  );
}