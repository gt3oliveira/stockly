import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import { SidebarButton } from "./sidebar-button";

export const Sidebar = () => {
  return (
    <div className="w-64 bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">STOCKLY</h1>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href="/" icon={<LayoutGridIcon />} label="Dashboard" />
        <SidebarButton
          href="/products"
          icon={<PackageIcon />}
          label="Products"
        />
        <SidebarButton
          href="/sales"
          icon={<ShoppingBasketIcon />}
          label="Sales"
        />
      </div>
    </div>
  );
};
