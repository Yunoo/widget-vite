export const getWindDirection = (angle: number): String => {
  const directions = [
    "↓ N",
    "↙ NE",
    "← E",
    "↖ SE",
    "↑ S",
    "↗ SW",
    "→ W",
    "↘ NW",
  ];
  return directions[Math.round(angle / 45) % 8];
};
