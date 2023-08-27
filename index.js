const puppeteer = require("puppeteer")
const { log } = require('console')
const readline = require("readline")
const delay = require("./functions/delay")
const fetchSchoolId = require("./functions/fetchSchoolId")
const analysisProfessor = require ("./functions/FetchProfessorReview")
const fetchProfessorId = require ("./functions/fetchProfessorId")
const fetchCampusId = require ("./functions/fetchCampusId")


async function start(){


    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });



    rl.question('What is your University Name? ', async (schoolName) => {
        //Cut down all the spaces and replace with %20.
        const trimmedName = schoolName.trim();
        const adjustedSchoolName = trimmedName.replace(/ /g, '%20');
        //set the right schoolUrl with right University search input.
        let schoolUrl = "https://www.ratemyprofessors.com/search/schools?q=" + adjustedSchoolName;

        fetchCampusId(schoolUrl);
        await delay(1000)
        rl.question('What is your campus ID? ', async (yourCampusID) => {
            const campusID = yourCampusID;

            rl.question("Enter professor Full Name : ", async (professorName) => {
                const trimmedName = professorName.trim();
                const adjustedProfessorName = trimmedName.replace(/ /g, '%20');
    
                const professorURL = "https://www.ratemyprofessors.com/search/professors/" + campusID + "?q=" + adjustedProfessorName;
                const professorID = await fetchProfessorId(professorURL, campusID, rl)
                await delay(1000)
                analysisProfessor(professorID)
            })
            
        })
        
    })    
    
}

start()
