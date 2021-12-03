export function getByPercentage(totalSpace: number, percentage: number) {
  return Math.floor(totalSpace * percentage / 100);
}
