import Image from "next/image";
import DashboardBoxes from "./components/DashboardBoxes/Index";
import ProductComponent from "./components/Products";
import UsersComponent from "./components/Users/Index";
import SalesAndUserChart from "./components/SalesAndUserChart";

export default function Home() {
  return (
    <div className="p-5">
      <DashboardBoxes />
      <div className="py-2">
        <ProductComponent />
      </div>

      <UsersComponent />

      <SalesAndUserChart />
    </div>
  );
}
