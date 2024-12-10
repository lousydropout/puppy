export const CircularButtonGroup = () => {
  return (
    <div class="relative w-64 h-64 mx-auto">
      {/* Large central button */}
      <button class="absolute top-1/2 left-1/2 w-16 h-16 bg-blue-500 text-white rounded-full transform -translate-x-1/2 -translate-y-1/2">
        Center
      </button>

      {/* Small buttons */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = i * 72 * (Math.PI / 180); // Divide 360° into 5 parts
        const radius = 80; // Distance from center
        const x = radius * Math.cos(angle); // X-coordinate
        const y = radius * Math.sin(angle); // Y-coordinate

        return (
          <button
            class="absolute right-1/2 w-8 h-8 bg-green-500 text-white rounded-full transform"
            style={{
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
            }}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
};
