import { Data } from "@components/Type";

// 1차원배열을 size개씩 묶어주어 2차원배열 만들어주는 함수
function chunk(data: Data[], size = 3) {
  const items = [...data];
  const arr = [];

  while (items.length) {
    arr.push(items.splice(0, size));
  }

  return arr;
}

export default chunk;
