/* 
    in which a washed up engineer cries about 'Hello World'
*/

const express = require('express')
const app = express()
const port = 3000

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var filename = "Refugee Bursary and Grant Resource.tsv" // name of TSV

const csv = require('csv-parser')
/*var*/ const fs = require('fs')

fs.createReadStream(filename)
    .pipe(csv({separator: '\t'})) // be sneaky and pretend the tsv is a csv 
    .on('data', (row) => { // for every new row, do this:
        console.log(row) // print what you see to console?
		
    })
    .on('end', () => { // at end of file, do this
        console.log('File processed. Glory to our robot overlords!')
    })


// ------------- GARBAGE ZONE --------------
/* fs.readFile(filename, 'utf8', function(err, contents){ // asynchronous file reading
    console.log(contents); // print what you read to console, for now

    //const parse = require('csv-parse')
    const assert = require('assert')
    const output = []

    const parser = parse({ // create parser
        delimiter: '\t' // be sneaky and pretend the tsv is a csv
    })



    


}); */

//console.log('after calling readFile');



/* 
    // attempt at another thing
const parse = require('csv-parse/lib/sync')
const assert = require('assert')

const input = `
    "key_1", "key_2"
    "value 1", "value 2"
`

const records = parse(input, {
    columns: true,
    skip_empty_lines: true
})

assert.deepEqual(records, [{key_1: 'value 1', key_2: 'value 2'}]) */

/* 
    // attempt at a thing
const parse = require('csv-parse')
const assert = require('assert')
const output = []

const parser = parse({ // create parser
    delimiter: '\t' // *tab* spaced values
})

parser.on('readable', function(){ // use readable stream API
    let record
    while(record = parser.read()){
        output.push(record)
    }
})

parser.on('error', function(err){ // catch yo errors
    console.error(err.message)
})

app.get('/', (req, res) => {//res.send('Hello World!'))
    require("csv-parse")

} */




