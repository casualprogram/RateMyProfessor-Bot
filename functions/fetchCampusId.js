const puppeteer = require("puppeteer")
const { log } = require('console')
const readline = require("readline")
const delay = require("./delay")
const cheerio = require("cheerio")
const request = require("request")



//Read user input from data
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  

//Fecth rateMyProfessors Url from user input
async function fetchSchoolUrl() {
    //Promise function work with async order.
    return new Promise((resolve, reject) => {
        //Prompt user input for University Name
      rl.question('What is your University Name? ', (schoolName) => {
        //Cut down all the spaces and replace with %20.
        const trimmedName = schoolName.trim();
        const adjustedSchoolName = trimmedName.replace(/ /g, '%20');
        //set the right schoolUrl with right University search input.
        let schoolUrl = "https://www.ratemyprofessors.com/search/schools?q=" + adjustedSchoolName;
        
        //return the full schoolUrl
        resolve(schoolUrl);
      });
    });
  }


  
//Function to fetch schoolId
async function fetchCampusId (){
    //run the fetSchoolUrl function and save the right Url into schooUrl
    let schoolUrl = await fetchSchoolUrl()

    request(schoolUrl, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            //console.log(html);

            // fetch school name, location, and school ID
            const schoolName = [];
            const schoolLocation = [];
            const schoolID = [];


            // fetch and trim school Name
            $(".SchoolCardHeader__StyledSchoolCardHeader-sc-1gq3qdv-0.bAQoPm").each((index, campus) => {
                const trimSchoolName = $(campus).text().replace(/QUALITY.*ratings/g, '').trim();
                schoolName.push(trimSchoolName);                
            });



            // fetch school location
            $(".SchoolCardLocation__StyledSchoolCardLocation-apbb23-0.jGTDSP").each((index, city) => {
                schoolLocation.push($(city).text())
            });
 


            // fetch school ID
            $(".SchoolCard__StyledSchoolCard-sc-130cnkk-0.bJboOI").each((index, id) => {
                const hrefID = $(id).attr("href");
                schoolID.push(hrefID.split("/")[2])
                
            })


            schoolLocation.forEach(function (location, index) {
                if (location.length <= 1) {
                    console.log (schoolName[index] + " --> " + schoolID[index])
                }
                else {
                    console.log (schoolName[index] + " in " + schoolLocation[index] + " --> " + schoolID[index])
                }   
            })

        }
    })



  }

  module.exports = fetchCampusId;