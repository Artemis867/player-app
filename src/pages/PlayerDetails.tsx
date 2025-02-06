import {useEffect, useState} from "react";
import { getPlayerDetail, getPlayerDetailBySeason } from "@/common/players.common";
import Navbar from "@/components/Navbar";
import { useLocation, useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import placeholderImage from "../assets/placeholder_img.png";
import BoxStats from "@/components/BoxStats";
import BoxStatsHeader from "@/components/BoxStatsHeader";
import HighlightStatsCard from "@/components/HighlightStatsCard";

export default function PlayerDetails() {
  const location = useLocation();
  const { playerId } = useParams();

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
      const playerDetail = await getPlayerDetail(playerId);
      setPlayerDetail(playerDetail.data[0].statistics);
    };

    const fetchPlayerDetailBySeason = async () => { 
      const playerDetailBySeason = await getPlayerDetailBySeason(playerId);
      setPlayerDetailSeason(playerDetailBySeason);
     };

    fetchPlayerDetail();
    fetchPlayerDetailBySeason();
  }, []);


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
            src={playerPersonalInfo.player_img !== '' ? playerPersonalInfo.player_img : placeholderImage}
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
        <HighlightStatsCard playerDetail={playerDetail} />
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <div className="w-[1200px] h-[auto] border border-black-600 p-2 overflow-x-auto rounded-md">
          <BoxStatsHeader/>
          {playerDetailSeason && playerDetailSeason.data.map((data, index) => <BoxStats seasonDates={seasonDates} data={data} index={index} />)}
        </div>
      </div>
    </>
  );
}