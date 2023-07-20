const puppeteer = require("puppeteer")
const { log } = require('console')
const readline = require("readline")
const delay = require("./delay")



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
async function fetchSchoolId (){
    //run the fetSchoolUrl function and save the right Url into schooUrl
    let schoolUrl = await fetchSchoolUrl()
    
    //open browser
    const browser = await puppeteer.launch({
        headless: true
    })

    const page = await browser.newPage();
    //go to schoolurl search page
    await page.goto(schoolUrl)
    //Close cookies terms page.
    await page.click(".Buttons__Button-sc-19xdot-1.CCPAModal__StyledCloseButton-sc-10x9kq-2.eAIiLw")

    await delay(5000)


    
    //Set close ads button variables
    const button = await page.$('._pendo-close-guide');
    //If there is a ad appear, click close
    if (button) {
        // Button exists, click button
        await page.click('._pendo-close-guide');
        await delay(3000)
        
    } else {
        // Button does not exist, perform alternative actions
        console.log('Button not found');
    }



 
    //Set the first University Name founded
    const firstFound = await page.$('.SchoolCardHeader__StyledSchoolCardHeader-sc-1gq3qdv-0.bAQoPm')

    
    //If the search were successfull clicked!
    if (firstFound){
        //Click on the first found school
        await page.click(".SchoolCardHeader__StyledSchoolCardHeader-sc-1gq3qdv-0.bAQoPm")

        //save the school page url
        const url = page.url();
        //chopped them up after "/" and save the schoolId in the end of URL
        const urlSplit = url.split("/")
        let schoolId = urlSplit[(urlSplit.length )- 1]

        await delay(2000)

        //This function help to save school Name title appear on the page
        const schoolName = await page.evaluate(() => {
            const spanElement = document.querySelector('.HeaderDescription__StyledTitleName-sc-1lt205f-1.eNxccF'); // Replace with the actual class name of the <span> element
            return spanElement.textContent;
        });
        
        //Print out School Name and School Id
        console.log("School founded - " + schoolName);
        console.log("schoolId - " + schoolId);

        //return schoolId
        await browser.close();
        return schoolId


        } else {
        await browser.close();
        return log("Error, no school founded !")

      }


  }

  module.exports = fetchSchoolId;
