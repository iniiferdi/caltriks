import { fraction } from "mathjs";

export function formatFraction(value) {
  if (!value) return "0";

  try {
    const frac = typeof value === "object" && value.isFraction
      ? value
      : fraction(value);

    return frac.toFraction(false);
  } catch (err) {
    return value.toString();
  }
}
