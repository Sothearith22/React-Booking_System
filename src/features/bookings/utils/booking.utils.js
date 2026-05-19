export const nightsBetween = (a, b) => {
  if (!a || !b) return 0;
  const diff = (new Date(b) - new Date(a)) / 86400000;
  return Math.max(0, Math.round(diff));
};

export const getBookingCode = (b) => b?.reference || `BK-${b?.id || ''}`;

export const getStaySummary = (b) => {
  if (b?.booking_type === 'Service') {
    return [b.start_time, b.end_time].filter(Boolean).join(' - ') || 'Service booking';
  }
  const nights = nightsBetween(b?.check_in, b?.check_out);
  return `${nights} Night${nights !== 1 ? 's' : ''}`;
};