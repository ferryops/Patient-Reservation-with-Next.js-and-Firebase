import DokterPieChart from "./Dashboard/DokterPieChart";
import PasienAgeChart from "./Dashboard/PasienAgeChart";
import PasienChart from "./Dashboard/PasienChart";
import ReservasiChart from "./Dashboard/ReservasiChart";
import { H4 } from "./Font";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 overflow-y-auto h-screen gap-4">
      <H4>Dashboard</H4>
      <div className="flex flex-col md:flex-row gap-4">
        <DokterPieChart />
        <PasienAgeChart />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <PasienChart />
        <ReservasiChart />
      </div>
    </div>
  );
}
