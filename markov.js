/** Textual markov chain generator */


class MarkovMachine {
  
  /** build markov machine; read in text.*/
/* This function builds a Markov chain representation (data structure) of the text. */

  constructor(text) {
//here we use a regular expression as the delimiter for .split()
//the separation of the text should be where there is a space or line break (new line character)
//the text is split into an array of individual words.

//next we take the result from the split and we use .filter to check for empty strings, if present,
//the empty strings are filtered out and we have an array that doesn't include empty strings 

//next we call the makeChains function


    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO

    //here we are constructing the data structure that represents each word and it's associated words

    //we create an Map that will hold the key value pairs of the word and the possible words that can
    //follow the word (it stores the word chains)
    //we can the use .get  and .has methods to check/get a word from the map
    
    let chains = new Map();

    //loop over elements in the words array (see:constructor)
    //for each element in the array, determine the word that follows (nextWord)
    //the i variable is the current word being processed

    //if the current word is the last word in the array, we set the nextWord to be null
    //if the current word is not the last word in the array, we set the nextWord to the 
    //next word in the array

    //Next we check if the chains map contains the current word (chains.has(currentWord))
    //if it does have the current word, then we want to update the chain


    //if our chains map currently contains the current word we are looking at, then we
    //add the next word as a subsequent value
    //if our chain doesn't contain the current word, we set the current word and the value of the next word
    //as the key value pair for the chain 
    
    //when we have finshed iterating over the loop, our chains map is assigned to the
    //our instance of the Markov Machine (this.chains)


    for (let i = 0; i < this.words.length; i ++) {
      let word = this.words[i];
      let nextWord = this.words[i +1] || null;

      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }

    this.chains = chains;
  }

  //Next we want to be able to randomize our results:

   /** Pick random choice from array */

   static randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }


  /** return random text from chains */

  //numWords is an optional parameter of the makeText method that is set to 100

  makeText(numWords = 100) {
    // TODO     
    // pick a random text (key) from list of keys in chains

    let listOfKeys = Array.from(this.chains.keys());
    let key = MarkovMachine.randomChoice(listOfKeys);
    let out = [];

    // produce markov chain until reaching the max number of words or 
    //untill we reach the a null value which indicates the end of the chain

    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.randomChoice(this.chains.get(key));
    }

    //we add a space between the result of each out.push from the wile loop

    return out.join(" ");
  
  }
}

//here we are exporting the MarkovMachine so we can use it in our 
//makeText.js


module.exports = {
  MarkovMachine,
};
