import {useEffect, useState} from "react";
import { getPlayerDetail, getPlayerDetailBySeason, getSeasonDate } from "@/common/players.common";
import Navbar from "@/components/Navbar";
import { useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function PlayerDetails() {
  const location = useLocation();
  const [playerDetail, setPlayerDetail] = useState({
    pointsPerGame: 0,
    reboundsDefensivePerGame: 0,
    assistsPerGame: 0,
    fieldGoalsEffectivePercentage: 0,
  });
  const [playerDetailSeason, setPlayerDetailSeason] = useState<{ data: any[] } | null>(null);
  const [seasonDates, setSeasonDates] = useState<string[] | null>(null);

  const playerPersonalInfo = location.state;
  

  useEffect(() => {
    const fetchPlayerDetail = async () => {
      const playerDetail = await getPlayerDetail();
      setPlayerDetail(playerDetail.data[0].statistics);
    };

    const fetchPlayerDetailBySeason = async () => { 
      const playerDetailBySeason = await getPlayerDetailBySeason();
      setPlayerDetailSeason(playerDetailBySeason);
     };

    fetchPlayerDetail();
    fetchPlayerDetailBySeason();
  }, []);

  useEffect(() => {
    console.log('TRACK: playerDetailSeason: ', playerDetailSeason?.data);
  }, [playerDetailSeason]);


  useEffect(() => {
    if(playerDetailSeason && playerDetailSeason.data.length !== 0) {
      const seasonDateAPIUrl = 'https://test.services.nbl.com.au/api_cache/nbl1/synergy?format=true&route=seasons';
      const urls =  [...playerDetailSeason.data].map(data => `${seasonDateAPIUrl}/${data.seasonId}`);
      const callSeasonDatas = async (urls: string[]) => {
        const promises = urls.map(url => fetch(url).then(res => res.json()));
        const results = await Promise.all(promises);
        const range = [...results].map(result =>  `${result.data[0].added.substring(0, 4)} - ${result.data[0].endDate.substring(0, 4)}`);
        setSeasonDates(range);
      }
      callSeasonDatas(urls);
    }
  }, [playerDetailSeason]);


  return (
    <>
      <Navbar/>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <div className="w-[80px] h-[80px] justify-center items-center p-1">
          <img
            src={playerPersonalInfo.player_img}
            alt="Player"
            width="200"
            height="200"
            className="h-16 w-16 rounded"
          />
        </div>
        <div className="w-[400px] h-[80px] p-1">
          <span className="text-xs">Player Name</span>
          <Separator/> 
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {playerPersonalInfo.full_name}
          </h2>
        </div>
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
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <div className="w-[1200px] h-[auto] border border-black-600 p-2 overflow-x-auto rounded-md">
          <div className="border-b-2 border-black">
            <span className="text-l font-semibold">Regular Season Average</span>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex-1 font-semibold text-sm">Season</div>
            <div className="flex-1 font-semibold text-sm">FG</div>
            <div className="flex-1 font-semibold text-sm">FG%</div>
            <div className="flex-1 font-semibold text-sm">3PT</div>
            <div className="flex-1 font-semibold text-sm">3P%</div>
            <div className="flex-1 font-semibold text-sm">FT</div>
            <div className="flex-1 font-semibold text-sm">FT%</div>
            <div className="flex-1 font-semibold text-sm">OR</div>
            <div className="flex-1 font-semibold text-sm">DR</div>
            <div className="flex-1 font-semibold text-sm">REB</div>
            <div className="flex-1 font-semibold text-sm">AST</div>
            <div className="flex-1 font-semibold text-sm">BLK</div>
            <div className="flex-1 font-semibold text-sm">STL</div>
            <div className="flex-1 font-semibold text-sm">PF</div>
            <div className="flex-1 font-semibold text-sm">TO</div>
            <div className="flex-1 font-semibold text-sm">PTS</div>
          </div>
          <Separator/>
          {playerDetailSeason && playerDetailSeason.data.map((data, index) => (
            <>
              <div key={index} className="flex gap-4 mt-4">
                <div className="flex-1 text-xs">{seasonDates && seasonDates[index]}</div>
                <div className="flex-1 text-xs">{data.statistics.fieldGoalsMade}</div>
                <div className="flex-1 text-xs">{data.statistics.fieldGoalsEffectivePercentage.toFixed(1)}</div>
                <div className="flex-1 text-xs">{data.statistics.pointsThreeAttemptedPerGame.toFixed(1)}</div>
                <div className="flex-1 text-xs">{data.statistics.pointsThreePercentage.toFixed(1)}</div>
                <div className="flex-1 text-xs">{data.statistics.freeThrowsMadePerGame.toFixed(1)}</div>
                <div className="flex-1 text-xs">{data.statistics.freeThrowsPercentage.toFixed(1)}</div>
                <div className="flex-1 text-xs">{data.statistics.reboundsOffensivePerGame.toFixed(1)}</div>
                <div className="flex-1 text-xs">{data.statistics.reboundsDefensivePerGame.toFixed(1)}</div>
                <div className="flex-1 text-xs">{data.statistics.reboundsPerGame.toFixed(1)}</div>
                <div className="flex-1 text-xs">{data.statistics.assistsPerGame.toFixed(1)}</div>
                <div className="flex-1 text-xs">{data.statistics.blocksPerGame.toFixed(1)}</div>
                <div className="flex-1 text-xs">{data.statistics.stealsPerGame.toFixed(1)}</div>
                <div className="flex-1 text-xs">{data.statistics.foulsPersonalPerGame.toFixed(1)}</div>
                <div className="flex-1 text-xs">{data.statistics.turnoversPerGame.toFixed(1)}</div>
                <div className="flex-1 text-xs">{data.statistics.pointsPerGame.toFixed(1)}</div>
              </div>
              <Separator/>
            </>
          ))}
        </div>
      </div>
    </>
  );
}