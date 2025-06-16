export default function CardSkeleton() {
  return (
    <div className="flex flex-col justify-between gap-3 bg-[var(--gray)] min-h-[460px] p-3 rounded-lg animate-pulse">
      <div className="gapS">
        <div className="h-[250px] bg-[var(--background)]/10 rounded-lg"></div>

        <div className="h-[50px] bg-[var(--background)]/10 rounded-lg"></div>

        <div className="h-[20px] bg-[var(--background)]/10 rounded-lg"></div>
        <div className="h-[20px] bg-[var(--background)]/10 rounded-lg w-2/3"></div>
      </div>

      <div className="h-[50px] bg-[var(--background)]/10 rounded-lg"></div>
    </div>
  );
}
