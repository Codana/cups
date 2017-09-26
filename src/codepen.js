
function* gene() {
  yield 10;
  yield 100;
  yield 1000;
  yield 10000;
  yield 100000;
  return 1000000;
}

const n = gene();

for (let i of gene()) {
  console.log(i);
}
