export function generateNumberPairArray(maxCardCount) {
  const selectedCardIndex = [];
  let accessableCardIndex = getAcessableCardIndexArray(18);
  while (selectedCardIndex.length / 2 !== maxCardCount / 2) {
    accessableCardIndex = shuffle(accessableCardIndex);
    const rand = accessableCardIndex.pop()
    if (!selectedCardIndex.includes(rand)) {
      selectedCardIndex.push(rand);
      selectedCardIndex.push(rand);
    }
  }
  return shuffle(selectedCardIndex);
}

function getAcessableCardIndexArray(accessableCardIndex) {
  const selectedIndex = [];
  for (let i = 1; i < accessableCardIndex + 1; i++) {
    selectedIndex.push(i);
  }
  return selectedIndex;
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
