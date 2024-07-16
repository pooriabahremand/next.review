export default function readNumber(num): number {
  if (!num) {
    return 1;
  }
  const pageNumber = Number(num);
  if (!pageNumber) {
    return 0;
  } else if (pageNumber <= 0) {
    return 0;
  } else {
    return pageNumber;
  }
}
