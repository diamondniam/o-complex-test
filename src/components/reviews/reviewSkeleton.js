export default function ReviewSkeleton() {
  return (
    <div className="bg-[var(--primary-darker)] rounded-lg animate-pulse p-3 gapS">
      <div className="h-[20px] bg-[var(--foreground)]/20 rounded-lg"></div>
      <div className="h-[20px] bg-[var(--foreground)]/20 rounded-lg"></div>
      <div className="h-[20px] w-2/3 bg-[var(--foreground)]/20 rounded-lg"></div>
    </div>
  );
}
