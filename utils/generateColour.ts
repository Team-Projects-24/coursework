//hashes given string to a colour. Used for generating colours for topics, projects names etc
export default function generateColour(topic: string) {
  const colours = [
    "#EF4444", // Red
    "#F59E0B", // Orange
    "#FCD34D", // Yellow
    "#10B981", // Green
    "#3B82F6", // Blue
    "#6B46C1", // Indigo
    "#8B5CF6", // Purple
    "#4B5563", // Gray
    "#1E293B", // Dark gray
    "#059669", // Emerald
    "#2D3748", // Cool gray
    "#7C3AED", // Violet
    "#DC2626", // Warm red
    "#374151", // Gray
    "#047857", // Green
    "#065F46", // Forest green
    "#1D4ED8", // Blue
    "#2563EB", // Sky blue
    "#ED8936", // Burnt orange
    "#38A169", // Green
    "#DB2777", // Fuchsia
    "#059669", // Green
    "#6B7280", // Gray
    "#DB2777", // Fuchsia
    "#B91C1C", // Red
    "#DB2777", // Fuchsia
    "#1E3A8A", // Navy blue
    "#065F46", // Forest green
    "#7C3AED", // Violet
    "#2563EB", // Sky blue
    "#059669", // Emerald
  ];

  const hash = topic.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  return colours[Math.abs(hash) % colours.length];
}
