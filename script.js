const fishContainer = document.getElementById('fish-container');
const numberButtons = document.getElementById('number-buttons');
const banner = document.getElementById('banner');

const fishCount = Math.floor(Math.random() * 7) + 8; // 8-14 fish
const randomNumbers = buildUniqueNumbers(fishCount, 1, 99);
const colors = ['#ff9966', '#ffd166', '#f48fb1', '#80cbc4', '#8ec5ff', '#d8a5ff'];

banner.textContent = 'Choose a number below to catch your lucky fish!';

randomNumbers.forEach((number, index) => {
  const fish = document.createElement('div');
  fish.className = 'fish';
  if (index % 2 === 1) {
    fish.classList.add('reverse');
  }

  fish.dataset.number = String(number);
  fish.style.setProperty('--fish-color', colors[index % colors.length]);
  fish.style.top = `${24 + (index % 6) * 52 + Math.random() * 16}px`;
  fish.style.setProperty('--duration', `${6 + Math.random() * 7}s`);
  fish.style.setProperty('--delay', `${-Math.random() * 8}s`);
  fish.style.setProperty('--travel', `${760 + Math.random() * 170}px`);
  fishContainer.appendChild(fish);

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = String(number);
  button.addEventListener('click', () => chooseLuckyNumber(number));
  numberButtons.appendChild(button);
});

function chooseLuckyNumber(number) {
  const allFish = fishContainer.querySelectorAll('.fish');
  allFish.forEach((fish) => fish.classList.remove('picked'));

  const selectedFish = fishContainer.querySelector(`[data-number="${number}"]`);
  selectedFish?.classList.add('picked');

  banner.textContent = `🎉 You picked the lucky number ${number}!`;
}

function buildUniqueNumbers(count, min, max) {
  const used = new Set();
  while (used.size < count) {
    const value = Math.floor(Math.random() * (max - min + 1)) + min;
    used.add(value);
  }
  return Array.from(used).sort((a, b) => a - b);
}
