const cheerio = require("cheerio")
const request = require("request")

async function analysisProfessor(professorId) {
    const link = "https://www.ratemyprofessors.com/professor/" + professorId
    console.log("URL at - " + link)
    request(link, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            // fetch professor's data
            const professorName = $(".NameTitle__Name-dowf0z-0")
            const overallQuality = $(".RatingValue__Numerator-qw8sqy-2")
            const department = $(".TeacherDepartment__StyledDepartmentLink-fl79e8-0")
            const tags = []
            const difficultyAndRetake = []
            const course = [];
            const dateOfReview = [];
            const commentOfReview = [];
            const gradeOfReview = [];

            // for level of difficulty and retake %
            $(".FeedbackItem__FeedbackNumber-uof32n-1").each((index, review) => {
                difficultyAndRetake.push($(review).text());
            });

            // for tags
            $(".TeacherTags__TagsContainer-sc-16vmh1y-0.dbxJaW span").each((index, tag) => {
                tags.push($(tag).text());
            });

            // for recent reviews
            $(".RatingHeader__StyledClass-sc-1dlkqw1-3.eXfReS").each((index, recentCourse) => {
                course.push($(recentCourse).text())
                
            });

            // for date of recent reviews
            $(".TimeStamp__StyledTimeStamp-sc-9q2r30-0.bXQmMr.RatingHeader__RatingTimeStamp-sc-1dlkqw1-4.iwwYJD").each((index, dates) => {
                dateOfReview.push($(dates).text())
            })

            // for comment of reviews
            $(".Comments__StyledComments-dzzyvm-0.gRjWel").each((index, comments) => {
                commentOfReview.push($(comments).text())
            })

            // for grades
            $(".MetaItem__StyledMetaItem-y0ixml-0.LXClX").each((index, grade) => {
                const factorsOfReview = [];
                factorsOfReview.push($(grade).text());
              
                const gradeArray = factorsOfReview.filter(item => item.includes("Grade: "));
                if (gradeArray.length > 0) {
                  const gradeText = gradeArray[0].replace("Grade: ", "");
                  gradeOfReview.push(gradeText);
                }
              });



            console.log(`
--- PROFESSOR INFO ---
Name: ${professorName.text()}
Department: ${department.text()}


--- REVIEW ---
Overall Quality: ${overallQuality.text()}
Level Of Difficulty: ${difficultyAndRetake[1]}
Retake: ${difficultyAndRetake[0]}
Top tags: ${tags.join(" - ")}

--- MOST RECENT REVIEWS ---
Course: ${course[0]}
Date: ${dateOfReview[0]}
GRADE: ${gradeOfReview[0]}
COMMENT: ${commentOfReview[0]}

Course: ${course[2]}
Date: ${dateOfReview[2]}
GRADE: ${gradeOfReview[1]}
COMMENT: ${commentOfReview[1]}

Course: ${course[4]}
Date: ${dateOfReview[4]}
GRADE: ${gradeOfReview[2]}
COMMENT: ${commentOfReview[2]}
            `)

        }
    })
}

module.exports = analysisProfessor
