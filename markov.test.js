const {MarkovMachine} = require('./markov');
let nm;
beforeEach(function(){
    nm = new MarkovMachine("a ab abc def a g")  
    console.log(nm);
})

afterEach(function(){
    let nm = undefined;
    console.log(nm);
})


//using describe to group test together:

//first testing that MarkovMachine.chains is a map
//when we instantiate a new instance of MarkovMachine

describe('Markov Methods Testing', function(){
    test('should create a map', function(){
        expect(nm.chains).toBeInstanceOf(Map);
    })

    test('chains return expected results', function () {        
        expect(nm.chains).toEqual(new Map([
          ["a", ["ab", "g"]],
          ["ab", ["abc"]],
          ["abc", ["def"]],
          ["def", ["a"]],           
          ["g", [null]]]));
      });        


    test('random choice picks valid element from array', function () {
        expect(MarkovMachine.randomChoice(['a','a','a'])).toBe('a');
        expect(['a','b','c','d']).toContain(MarkovMachine.randomChoice(['a','b','c','d']));
      });




      
})


 

