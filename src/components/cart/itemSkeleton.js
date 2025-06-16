export default function ItemSkeleton({ isError }) {
  return (
    <div className="gapS animate-pulse relative flex justify-center items-center">
      <div
        className={`gapS w-full transition-all ${
          isError ? "[&>div]:bg-[var(--error)]/20" : ""
        }`}
      >
        <div className="h-[20px] w-full bg-[var(--background)]/10 rounded-lg"></div>
        <div className="h-[20px] w-full bg-[var(--background)]/10 rounded-lg"></div>
        <div className="h-[20px] w-2/3 bg-[var(--background)]/10 rounded-lg"></div>
      </div>

      <div className="absolute text-[var(--background)]">
        {isError ? "Нет товаров" : "Выберите товар"}
      </div>
    </div>
  );
}
