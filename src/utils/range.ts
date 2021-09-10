export default function range(number: number) {
  let range = [];

  if (number >= 1) {
    for (let i = 1; i < number; i++) {
      range.push(i);
    }
  } else {
    range.push(1);
  }

  return range;
}
