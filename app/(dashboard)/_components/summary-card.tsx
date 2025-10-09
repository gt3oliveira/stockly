interface SummaryCardProps {
  children: React.ReactNode;
}

export const SummaryCardIcon = ({ children }: SummaryCardProps) => {
  return (
    <div className="mb-2 flex size-9 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-500">
      {children}
    </div>
  );
};

export const SummaryCardTitle = ({ children }: SummaryCardProps) => {
  return <p className="text-sm font-medium text-slate-500">{children}</p>;
};

export const SummaryCardValue = ({ children }: SummaryCardProps) => {
  return <p className="text-2xl font-semibold text-slate-900">{children}</p>;
};

export const SummaryCard = ({ children }: SummaryCardProps) => {
  return <div className="rounded-xl bg-white p-6">{children}</div>;
};
