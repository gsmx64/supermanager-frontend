// Formats a float to the user's locale string representation
export function geolocationFormat(
  value: number,
  locale?: string
): number {
  return Number(
    value.toLocaleString(
      locale ? locale : 'en-US',
      { minimumFractionDigits: 6, maximumFractionDigits: 6 }
    )
  );
}

// Converts a localized string (e.g., "-34.605782" or "-34,605782") to a float for DB storage
export function parseGeolocationToDB(
  value: number
): number {
  // Convert number to string with comma as decimal separator
  const strValue = value.toFixed(6).replace('.', ',');
  // Replace comma with dot for DB storage and parse back to number
  const normalized = strValue.replace(',', '.');
  return parseFloat(normalized);
}
