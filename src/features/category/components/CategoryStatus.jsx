const CategoryStatus = ({ status }) => {
  const normalizedStatus = String(status || "").toLowerCase();
  const isAvailable = normalizedStatus === "available" || normalizedStatus === "active";
  const isUnavailable = normalizedStatus === "unavailable" || normalizedStatus === "inactive";

  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
      ${
        isAvailable
          ? "bg-emerald-50 text-emerald-700"
          : isUnavailable
          ? "bg-gray-100 text-gray-400"
          : "bg-blue-50 text-blue-700"
      }`}
    >
      {isAvailable ? "Available" : isUnavailable ? "Unavailable" : status}
    </span>
  );
};

export default CategoryStatus;
