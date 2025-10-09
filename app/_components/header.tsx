import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const HeaderTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-xl font-semibold">{children}</h2>;
};

export const HeaderSubtitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="text-xs font-semibold text-slate-500">{children}</span>
  );
};

export const HeaderLeft = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-1">{children}</div>;
};

export const HeaderRight = ({ children, className }: Props) => {
  return <div className={cn(className)}>{children}</div>;
};

export const Header = ({ children, className }: Props) => {
  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      {children}
    </div>
  );
};
