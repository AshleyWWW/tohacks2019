const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    function computeMatch() {
        function ageMatch() {}
        function locationMatch() {}
        
        return 0.0;
    }

    for (const key in req.query) {
        console.log(key, req.query[key]);
    }
    res.send('Hello World!');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));