const express = require('express');
const app = express();
const port = 3000;

// Hard-coded values for testing
// TODO replace with code that reads from the "database"
dataTable = [
    {
        "name": "Resettlement Assistance Program (RAP)  - All Provinces, excluding Quebec",
        "url": "http://www.rstp.ca/wp-content/uploads/2019/03/Start-up.pdf",
        "ageMin": 10,
        "ageMax": 30,
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
    function ageMatch(limits, age) {
        return (age >= limits[0] && age <= limits[1]);
    }
    function locationMatch(places, destination) {
        return places.includes(destination);
    }
    function computeMatch() {
        return 0.0;
    }

    results = [];
    dataTable.forEach((element) => {
        console.log(element);
        if (ageMatch([element.ageMin, element.ageMax], req.query.age)
            && locationMatch(element.provinces, req.query.destination)) {
            results.push(element);
        }
    });

    res.send(results); // send the good entries
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));