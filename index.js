const puppeteer = require("puppeteer")
const { log } = require('console')
const readline = require("readline")
const delay = require("./functions/delay")
const fetchSchoolId = require("./functions/fetchSchoolId")
const analysisProfessor = require ("./functions/FetchProfessorReview")
const fetchProfessorId = require ("./functions/fetchProfessorId")


async function start(){
    const schoolId = await fetchSchoolId()
    const professorId = await fetchProfessorId(schoolId)
    await analysisProfessor(professorId)
}

start()
