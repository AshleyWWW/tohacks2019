document.getElementById("submitBtn").onclick = function (event) {
    event.preventDefault();
    function assembleQueryString() {
        var query = "?" + 
                    // "originCountry=" + document.getElementById("originCountry").innerHTML +
                    // "&yearsInCanada=" + document.getElementById("yearsCDN").innerHTML + 
                    "destination=" + document.getElementById("destination").value + 
                    "&age=" + document.getElementById("age").value +
                    // "&maritalStatus=" + maritalSel.options[maritalSel.selectedIndex].text +
                    "&studentStatus=" + (document.getElementById("studentStatus").checked ? "Y" : "N") + 
                    "&school=" + document.getElementById("school").value;
                    // "&dependants=" + document.getElementById("userDependant").innerHTML;
        return query;
    }
    
    fetch("http://localhost:3000/" + assembleQueryString(), {
        mode: 'cors'
    }).then(function (data) {
        console.log(data);
        return data.json();
    }).then(function (body) {
        headers = ['name', 'url', 'provinces', 'ageMin', 'ageMax', 'language', 'studentStatus', 'school', 'gpa', 'maritalStat', 'dependants', 'ethnicity', 'yearsInCanada'] // renamed headers, etc
        headerNames = ['NAME OF BURSARY', 'LINK', 'ENTRY PROVINCE', 'AGE MIN', 'AGE MAX', 'ENGLISH/FRENCH COMPETENT (oral and written)', 'STUDENT-BASED(Y/N)', 'SCHOOL OF STUDY (NONE if not student, ANY for any school)', 'GRADE AVERAGE (NONE, if none needed)', 'MARRIAGE STATUS (Married, Single, ANY)', 'NUMBER OF DEPENDANTS (ANY for acceptance regardless)', 'ETHNICITY (ANY for open acceptance)', 'Minimum Number of Years in Canada'];
        var table = "<table class='table table-responsive'><thead><tr>";
        headerNames.forEach(header => {
            table += "<th scope='col'>" + header + "</th>";
        });
        table += "</tr></thead><tbody>";
        body.forEach(element => {
            table += "<tr>"
            headers.forEach(header => {
                if (header == "url") {
                    table += "<td><a href=" + element[header] + ">link</a></td>"
                } else {
                    table += "<td>" + element[header] + "</td>";
                }
            });
            table += "</tr>";
        });
        table += "</tbody></table>"
        document.getElementById('output').innerHTML = table;
    });
}; 
