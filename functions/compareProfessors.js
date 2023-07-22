const cheerio = require("cheerio")
const request = require("request")


function alignColumns(...columns) {
    const maxRows = Math.max(...columns.map(column => column.length));
    const columnWidths = columns.map(column => column.reduce((acc, value) => Math.max(acc, value.length), 0));
  
    const formattedRows = [];
    for (let rowIndex = 0; rowIndex < maxRows; rowIndex++) {
      const row = columns.map((column, columnIndex) => (column[rowIndex] || '').padEnd(columnWidths[columnIndex]));
      formattedRows.push(row.join(' | '));
    }
  
    return formattedRows;
}
  


async function analysisProfessor() {
    const professorID1 = "230441";
    const professorID2 = "2685358";


    const link1 = "https://www.ratemyprofessors.com/professor/" + professorID1

    // console.log("URL at - " + link)
    request(link1, (error, response, html) => {
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


            // second pro
            const link2 = "https://www.ratemyprofessors.com/professor/" + professorID2
            request(link2, (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    const $2 = cheerio.load(html);
        
                    // fetch professor's data
                    const professorName2 = $2(".NameTitle__Name-dowf0z-0")
                    const overallQuality2 = $2(".RatingValue__Numerator-qw8sqy-2")
                    const department2 = $2(".TeacherDepartment__StyledDepartmentLink-fl79e8-0")
                    const tags2 = []
                    const difficultyAndRetake2 = []
                    const course2 = [];
                    const dateOfReview2 = [];
                    const commentOfReview2 = [];
                    const gradeOfReview2 = [];
        
                    // for level of difficulty and retake %
                    $2(".FeedbackItem__FeedbackNumber-uof32n-1").each((index, review) => {
                        difficultyAndRetake2.push($(review).text());
                    });
        
                    // for tags
                    $2(".TeacherTags__TagsContainer-sc-16vmh1y-0.dbxJaW span").each((index, tag) => {
                        tags2.push($(tag).text());
                    });
        
                    // for recent reviews
                    $2(".RatingHeader__StyledClass-sc-1dlkqw1-3.eXfReS").each((index, recentCourse) => {
                        course2.push($(recentCourse).text())
                        
                    });
        
                    // for date of recent reviews
                    $2(".TimeStamp__StyledTimeStamp-sc-9q2r30-0.bXQmMr.RatingHeader__RatingTimeStamp-sc-1dlkqw1-4.iwwYJD").each((index, dates) => {
                        dateOfReview2.push($(dates).text())
                    })
        
                    // for comment of reviews
                    $2(".Comments__StyledComments-dzzyvm-0.gRjWel").each((index, comments) => {
                        commentOfReview2.push($(comments).text())
                    })
        
                    // for grades
                    $2(".MetaItem__StyledMetaItem-y0ixml-0.LXClX").each((index, grade) => {
                        const factorsOfReview = [];
                        factorsOfReview.push($(grade).text());
                      
                        const gradeArray = factorsOfReview.filter(item => item.includes("Grade: "));
                        if (gradeArray.length > 0) {
                          const gradeText = gradeArray[0].replace("Grade: ", "");
                          gradeOfReview2.push(gradeText);
                        }
                    });
                  

                    // Assuming professorName, professorName2, department, department2, overallQuality, overallQuality2, difficultyAndRetake, difficultyAndRetake2, tags, and tags2 are variables with appropriate values

                    const output = alignColumns(
                        ['Professor Name', 'Department', 'Overall Quality', 'Level Of Difficulty', 'Retake', 'Top tags'],
                        [professorName.text(), department.text(), overallQuality.text(), difficultyAndRetake[1], difficultyAndRetake[0], ...tags],
                        [professorName2.text(), department2.text(), overallQuality2.text(), difficultyAndRetake2[1], difficultyAndRetake2[0], ...tags2]
                      ).join('\n' + '-'.repeat(80) + '\n');
                      
                      console.log(output);
  
                }


            })       


        }
    })
}



analysisProfessor()

