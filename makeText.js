/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");





/** Instantiate new intance of MarkovMachine and create text  */

function createText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
  }
  
  
  /** read file and create text if no error */
  
  function makeText(filePath) {
    fs.readFile(filePath, "utf8", function (err, data) {
      if (err) {
        console.error(`Read File Error: ${filePath}: ${err}`);
        process.exit(1);
      } else {
        createText(data);
      }
    });
  
  }
  
  
  /** get and create text from URL */
  
  
  async function textFromURL(url) {
    let resp;
  
    try {
      resp = await axios.get(url);
    } catch (err) {
      console.error(`Error reading URL: ${url}: ${err}`);
      process.exit(1);
    }
    createText(resp.data)
  }
  
////////////////////////
//////////////////





/* Determine what to do based on what is keyed in the command line (command line arguments)  */
//  const argv = process.argv;
//  console.log(argv)
 const format = process.argv[2];
 const path = process.argv[3]

  
  if (format === "file") {
    makeText(path);
  }
  
  else if (format === "url") {
    textFromURL(path);
  }
  
  else {
    console.error(`Invalid format: ${format}`);
    process.exit(1);
  }