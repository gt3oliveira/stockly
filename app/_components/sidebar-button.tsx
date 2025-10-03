"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export const SidebarButton = ({ href, icon, label }: SidebarButtonProps) => {
  const pathname = usePathname();

  return (
    <Button
      variant={pathname === href ? "secondary" : "ghost"}
      className="justify-start"
      asChild
    >
      <Link href={href}>
        {icon}
        {label}
      </Link>
    </Button>
  );
};
