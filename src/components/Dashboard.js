import React from "react";
import DokterPieChart from "./Dashboard/DokterPieChart";
import PasienAgeChart from "./Dashboard/PasienAgeChart";
import PasienChart from "./Dashboard/PasienChart";
import ReservasiChart from "./Dashboard/ReservasiChart";
import { H4 } from "./Font";
import { fetchDokter } from "@/services/dokterService";
import { fetchPasienBerdasarkanUsia } from "@/services/chartService";
import { Spinner } from "@nextui-org/react";

export default function Dashboard() {
  const [dokters, setDokters] = React.useState([]);
  const [pasiensUsia, setPasiensUsia] = React.useState();

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [dokterData, pasienUsiaData] = await Promise.all([fetchDokter(), fetchPasienBerdasarkanUsia()]);
        setDokters(dokterData);
        setPasiensUsia(pasienUsiaData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="container mx-auto p-4 overflow-y-auto h-screen gap-4">
      <H4>Dashboard</H4>
      <div className="w-full flex flex-col md:flex-row gap-4 md:justify-around">
        {dokters.length > 0 ? <DokterPieChart dokters={dokters} /> : <Spinner size="xl" label="Loading..." />}
        {pasiensUsia ? <PasienAgeChart pasiensUsia={pasiensUsia} /> : <Spinner size="xl" label="Loading..." />}
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <PasienChart />
        <ReservasiChart />
      </div>
    </div>
  );
}
