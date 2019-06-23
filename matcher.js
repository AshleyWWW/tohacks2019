const express = require('express');
const app = express();
const port = 3000;

const blankMeansYes = true; 

// Hard-coded values for testing
// TODO replace with code that reads from the "database"
dataTable = [
    {
        "name": "Incoming Refugee Sponsorship Bursary (IRSB) - ON",
        "url": "https://static1.squarespace.com/static/56d1fe3ed210b8b23f16d059/t/5aaff3042b6a28d1b413f7ca/1521480453390/Incoming+Refugee+Sponsorship+Bursary+%282%29.pdf",
        "ageMin": 17,
        "ageMax": 30,
        "provinces": ["ANY"]
    },
    {
        "name": "Resettlement Assistance Program (RAP)  - All Provinces, excluding Quebec",
        "url": "http://www.rstp.ca/wp-content/uploads/2019/03/Start-up.pdf",
        "ageMin": 0,
        "ageMax": 100,
        "provinces": ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Saskatchewan"]
    }, 
    {
        "name" : "Alberta Resettlement Assistance Program (RAP) Rate",
        "url" : "http://www.rstp.ca/wp-content/uploads/2018/08/Alberta-RAP-rates.pdf",
        "ageMin" : 0,
        "ageMax" : 100,
        "provinces" : ["Alberta"]
    }
];

app.get('/', (req, res) => {
    function computeMatch(element, profile) {
        function ageMatch(min, max, age) {
            return age ? (age >= min && age <= max) : blankMeansYes;
        }
        function locationMatch(places, destination) {
            return destination ? (places.includes('ANY') || places.includes(destination)) : blankMeansYes;
        }

        return (ageMatch(element.ageMin, element.ageMax, profile.age) 
            && locationMatch(element.provinces, profile.destination));
    }

    results = [];
    dataTable.forEach((element) => {
        if (computeMatch(element, req.query)) {
            results.push(element);
        }
    });

    res.send(results); // send the good entries
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));