import {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import { fetchPlayers } from "../common/players.common";
import { DataTableDemo } from "@/components/DataTableDemo";

export default function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayersData = async () => {
      const players = await fetchPlayers();
      setPlayers(players.data);
    };

    fetchPlayersData();
  }, []);

  return (
    <>
      <Navbar />
      <DataTableDemo playerList={players} />
    </>
  );
}

