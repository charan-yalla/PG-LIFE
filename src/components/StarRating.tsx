import { Star, StarHalf } from "lucide-react";

export default function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span className="stars" style={{ display: "flex", alignItems: "center", gap: 2, color: "#fca110" }} title={`${rating} / ${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const full = rating >= i + 0.8;
        const half = !full && rating >= i + 0.3;
        return (
          <span key={i} style={{ color: full || half ? undefined : "#d2d2d7" }}>
            {full ? (
              <Star size={12} fill="currentColor" />
            ) : half ? (
              <StarHalf size={12} fill="currentColor" />
            ) : (
              <Star size={12} />
            )}
          </span>
        );
      })}
      <span className="rating-num" style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: 4 }}>
        {rating}
      </span >
    </span>
  );
}
