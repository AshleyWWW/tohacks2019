const headers = ['name', 'url', 'provinces', 'ageMin', 'ageMax', 'language', 'studentStatus', 'school', 'gpa', 'maritalStat', 'dependants', 'ethnicity', 'yearsInCanada'] // renamed headers, etc
const headerNames = ['NAME OF BURSARY', 'LINK', 'ENTRY PROVINCE', 'AGE MIN', 'AGE MAX', 'ENGLISH/FRENCH COMPETENT (oral and written)', 'STUDENT-BASED(Y/N)', 'SCHOOL OF STUDY (NONE if not student, ANY for any school)', 'GRADE AVERAGE (NONE, if none needed)', 'MARRIAGE STATUS (Married, Single, ANY)', 'NUMBER OF DEPENDANTS (ANY for acceptance regardless)', 'ETHNICITY (ANY for open acceptance)', 'Minimum Number of Years in Canada'];

document.getElementById("submitBtn").onclick = function () {
    function assembleQueryString() {
        var query = "?" + 
                    "originCountry=" + document.getElementById("originCountry").innerHTML +
                    "&yearsInCanada=" + document.getElementById("yearsCDN").innerHTML + 
                    "&destination=" + document.getElementById("hostProv").innerHTML + 
                    "&age=" + document.getElementById("age").innerHTML +
                    "&maritalStatus=" + document.getElementById("userProf").innerHTML +
                    "&school=" + document.getElementById("school").innerHTML +
                    "&dependants=" + document.getElementById("userDependant").innerHTML;
    }
    
    fetch("http://localhost:3000/" + query, {
        mode: 'cors'
    }).then(function (data) {
        return data.json();
    }).then(function (body) {
        headers = ['name', 'url', 'provinces', 'ageMin', 'ageMax', 'language', 'studentStatus', 'school', 'gpa', 'maritalStat', 'dependants', 'ethnicity', 'yearsInCanada'] // renamed headers, etc
        headerNames = ['NAME OF BURSARY', 'LINK', 'ENTRY PROVINCE', 'AGE MIN', 'AGE MAX', 'ENGLISH/FRENCH COMPETENT (oral and written)', 'STUDENT-BASED(Y/N)', 'SCHOOL OF STUDY (NONE if not student, ANY for any school)', 'GRADE AVERAGE (NONE, if none needed)', 'MARRIAGE STATUS (Married, Single, ANY)', 'NUMBER OF DEPENDANTS (ANY for acceptance regardless)', 'ETHNICITY (ANY for open acceptance)', 'Minimum Number of Years in Canada'];
        var table = "<table border='1'><tr>";
        headerNames.forEach(header => {
            table += "<td>" + header + "</td>";
        });
        body.forEach(element => {
            table += "<tr>"
            headers.forEach(header => {
                table += "<td>" + element[header] + "</td>";
            });
            table += "</tr>";
        });
        table += "</table>"
        document.getElementById("output").innerHTML = table;
    });
}; 
