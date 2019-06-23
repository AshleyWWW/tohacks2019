const express = require('express');
const app = express();
const port = 3000;

// if the user doesn't specify anything, does that mean they match
// yes they match = true
const blankMeansYes = true; 

// Hard-coded values for testing
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
];

// what to do when the GET request comes in
app.get('/', (req, res) => {
    // does this person's profile match this element (entry of the data table)?
    function computeMatch(element, profile) {
        // does their age match
        function ageMatch(min, max, age) {
            return age ? (age >= min && age <= max) : blankMeansYes; // ? : is called the ternary operator btw
        }
        // does their location match
        function locationMatch(places, destination) {
            return destination ? (places.includes('ANY') || places.includes(destination)) : blankMeansYes;
        }
        // does their student status/not match
        function studentStatusMatch(requirement, status) {
            return status ? (requirement == 'ANY' || requirement == status) : blankMeansYes;
        }
        // etc etc, can someone else do this

        //return whether or not the criteria all matches
        return (ageMatch(element.ageMin, element.ageMax, profile.age) 
            && locationMatch(element.provinces, profile.destination)
            && studentStatusMatch(element.studentStatus, profile.studentStatus));
    }

    // the bursaries the user qualifies for 
    results = [];
    // for each bursary in the table
    dataTable.forEach((element) => {
        if (computeMatch(element, req.query)) {
            results.push(element); // the person is suited to this grant/bursary/thing
        }
    });

    res.send(results); // send back the matches
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));