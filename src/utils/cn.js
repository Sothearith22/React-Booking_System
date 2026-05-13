const flattenValue = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(flattenValue);
  }

  if (typeof value === 'object') {
    return Object.entries(value)
      .filter(([, enabled]) => Boolean(enabled))
      .map(([className]) => className);
  }

  return [String(value)];
};

export function cn(...inputs) {
  return inputs
    .flatMap(flattenValue)
    .filter(Boolean)
    .join(' ');
}
