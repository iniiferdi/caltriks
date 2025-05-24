export const formatFraction = (value) => {
  if (value && typeof value === "object" && value.isFraction) {
    return value.toFraction();
  }
  return value ?? "";
};
