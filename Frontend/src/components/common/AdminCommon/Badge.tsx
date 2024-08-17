
import React from "react";

interface BadgeProps {
  count: number;
  color?: string;
}

const Badge: React.FC<BadgeProps> = ({ count, color = "bg-red-500" }) => {
  if (count <= 0) return null;

  return (
    <span
      className={`absolute top-0 right-0 inline-block w-4 h-4 text-center text-white text-xs font-semibold rounded-full ${color}`}
    >
      {count}
    </span>
  );
};

export default Badge;
