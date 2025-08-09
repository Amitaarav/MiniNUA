type StarRatingProps = {
  rate?: number;
  count?: number;
  className?: string;
};

export default function StarRating({ rate = 0, count = 0, className = '' }: StarRatingProps) {
  const stars = Math.max(0, Math.min(5, Math.round(rate)));
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-label={`Rating ${rate} out of 5`}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={i < stars ? 'text-yellow-500' : 'text-gray-300'}
            aria-hidden="true"
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-gray-600">({count})</span>
    </div>
  );
} 