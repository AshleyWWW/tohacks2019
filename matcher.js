/* 
    in which sleep deprieved programmers argue about naming conventions
*/

const express = require('express');
const app = express();
const port = 3000;

// if the user doesn't specify anything, does that mean they match
// yes they match = true
const blankMeansYes = true; 

//---------------------------------
var filename = "Refugee Bursary and Grant Resource.tsv" // name of TSV

const csv = require('csv-parser') // requires npm csv-parser, csv
/*var*/ const fs = require('fs')

const headersTable = []
fs.createReadStream(filename)
    .pipe(csv({
        separator: '\t', // be sneaky and pretend the tsv is a csv 
})) 
    .on('headers', (headers) => { // at end of file...
        //console.log(`${headers}`)
		//console.log(headers) // print every damn thing
		headersTable.push(headers)
        // console.log(headersTable)
		
        // console.log('Headers captured. Carry on.')
    });


const dataTable = [] // holds all the parsed data

fs.createReadStream(filename)
    .pipe(csv({
        separator: '\t', // be sneaky and pretend the tsv is a csv 
        skipLines: 1, // ignore parsed headers
        headers: ['name', 'url', 'provinces', 'ageMin', 'ageMax', 'language', 'studentStatus', 'school', 'gpa', 'maritalStat', 'dependants', 'ethnicity', 'yearsInCanada'] // renamed headers, etc
    })) 
    .on('data', (row) => { // for every new row...
        dataTable.push(row) // add parsed data to array
        //console.log(row) // print what you see to console?
    })
    .on('end', () => { // at end of file...
        //console.log(dataTable) // print every damn thing
        // console.log('File processed. Glory to our robot overlords!')
    });

//console.log(dataTable[0])
//-----------------------------------


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); 
  });

// what to do when the GET request comes in
app.get('/', (req, res) => {
    // does this person's profile match this element (entry of the data table)?
    function computeMatch(element, profile) {
        // does their age match
        function ageMatch(min, max, age) {
            console.log(element.name + " ageMatch " + min + " " + max + " " + age + " " + (age ? (age >= min && age <= max) : blankMeansYes));
            console.log((age) + (age >= min) + (age <= max) + blankMeansYes);
            return age ? (age >= min && age <= max) : blankMeansYes; // ? : is called the ternary operator btw
        }
        // does their location match
        function locationMatch(places, destination) {
            console.log(element.name + " loc " + (destination ? (places.includes('ANY') || places.includes(destination)) : blankMeansYes));
            //return destination ? (`${places}`.includes('ANY') || `${places}`.includes(`${destination}`)) : blankMeansYes;
			return destination ? (places.includes('ANY') || places.includes(destination)) : blankMeansYes;
			
        }
        // does their student status/not match
        function studentStatusMatch(requirement, status) {
            console.log(element.name + " stu " + (status ? (requirement == 'ANY' || requirement == status) : blankMeansYes));
            return status ? (requirement == 'ANY' || requirement == status) : blankMeansYes;
        }
        // etc etc, can someone else do this

        //return whether or not the criteria all matches
        return (ageMatch(parseInt(element.ageMin), parseInt(element.ageMax), parseInt(profile.age)) 
            && locationMatch(element.provinces, profile.destination)
            && studentStatusMatch(element.studentStatus, profile.studentStatus));
    }

    // the bursaries the user qualifies for 
    results = [];
    // for each bursary in the table
    dataTable.forEach((element) => {
		console.log("\n" + element.name)
		//alert(element.name)
        if (computeMatch(element, req.query)) {
            console.log(element.name)
			results.push(element); // the person is suited to this grant/bursary/thing
        }
    });

    res.send(results); // send back the matches
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/* // Hard-coded values for testing
// TODO replace with code that reads from the "database"
dataTable = [
    {
        "name": "Incoming Refugee Sponsorship Bursary (IRSB) - ON",
        "url": "https://static1.squarespace.com/static/56d1fe3ed210b8b23f16d059/t/5aaff3042b6a28d1b413f7ca/1521480453390/Incoming+Refugee+Sponsorship+Bursary+%282%29.pdf",
        "ageMin": 17,
        "ageMax": 30,
        "provinces": ["ANY"],
        "studentStatus": "Y"
    },
    {
        "name": "Resettlement Assistance Program (RAP)  - All Provinces, excluding Quebec",
        "url": "http://www.rstp.ca/wp-content/uploads/2019/03/Start-up.pdf",
        "ageMin": 0,
        "ageMax": 100,
        "provinces": ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Saskatchewan"],
        "studentStatus": "N"
    }, 
    {
        "name" : "Alberta Resettlement Assistance Program (RAP) Rate",
        "url" : "http://www.rstp.ca/wp-content/uploads/2018/08/Alberta-RAP-rates.pdf",
        "ageMin" : 0,
        "ageMax" : 100,
        "provinces" : ["Alberta"],
        "studentStatus": "N"
    }
]; */