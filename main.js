fetch("http://localhost:3000/?age=20", {
    mode: 'cors'
}).then(function (data) {
    return data.json();
}).then(function (body) {
    headers = ['name', 'url', 'provinces', 'ageMin', 'ageMax', 'language', 'studentStatus', 'school', 'gpa', 'maritalStat', 'dependants', 'ethnicity', 'yearsInCanada'] // renamed headers, etc
    var table = "<table border='1'><tr>";    
    headers.forEach(header => {
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
})
