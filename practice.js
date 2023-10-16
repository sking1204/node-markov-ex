
let chains = new Map();
let words = ['I', 'am', 'Sam', 'I', 'am', 'test'];

for (let i = 0; i < words.length - 1; i++) {
  let word = words[i];
  let nextWord = words[i + 1];
  if (chains.has(word)) {
    chains.get(word).push(nextWord);
  } else {
    chains.set(word, [nextWord]);
  }
}

console.log(chains);
