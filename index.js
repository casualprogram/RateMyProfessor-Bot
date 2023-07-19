const puppeteer = require("puppeteer")
const { log } = require('console')
const readline = require("readline")
const delay = require("./functions/delay")
const fetchSchoolId = require("./functions/fetchSchoolId")


async function start(){
    fetchSchoolId()
}

start()
