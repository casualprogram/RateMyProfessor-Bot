const puppeteer = require("puppeteer")
const { log } = require('console')
const readline = require("readline")
const delay = require("./functions/delay")
const fetchSchoolId = require("./functions/fetchSchoolId")


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  


async function start(){
    fetchSchoolId()
}

start()
