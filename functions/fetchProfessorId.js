const puppeteer = require("puppeteer")
const { log } = require('console')
const readline = require("readline")
const delay = require("./delay")




async function fetchProfessorId(professorURL, schoolId, rl) {
    const proffesorSearchUrl = professorURL;

    const browser = await puppeteer.launch({
        headless:true
    })

    const page = await browser.newPage();

    await page.goto(proffesorSearchUrl);

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

    const firstFound = await page.$(".CardSchool__Department-sc-19lmz2k-0.haUIRO")

    if (firstFound){
        await page.click(".CardSchool__Department-sc-19lmz2k-0.haUIRO");

        const url = page.url();

        const urlSplit = url.split("/")
        let professorId = urlSplit[(urlSplit.length)-1]

        await delay(2000)

        const ProfessorName = await page.evaluate(() => {
            const spanElement = document.querySelector('.NameTitle__Name-dowf0z-0.cfjPUG');
            return spanElement.textContent;
        });

        log("Professor Found - " + ProfessorName + "\n professor ID - " + professorId)
        await browser.close();
        return professorId;
        
        
    } else {
        await browser.close();
        return log("Error, no Professor found.")
    }
}

module.exports = fetchProfessorId;
