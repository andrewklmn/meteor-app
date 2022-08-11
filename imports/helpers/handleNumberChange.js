export const handleNumberChange = (e) => {
  const value = e.target.value
    .replace(/\,+/g, ".")
    .replace(/[^0-9\.]/g, "")
    .replace(/\.+/g, ".");
  const splittedByDot = value.split(".");
  const result =
    splittedByDot.length > 1 ? splittedByDot.slice(0, 2).join(".") : value;
  return !isNaN(Number(result)) && Number(result) >= 0 ? result : 0;
};
