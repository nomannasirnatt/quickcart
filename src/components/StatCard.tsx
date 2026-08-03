export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-black/[.02] px-4 py-3 dark:border-white/10 dark:bg-white/[.03]">
      <dt className="text-xs uppercase tracking-wide text-black/50 dark:text-white/50">
        {label}
      </dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
