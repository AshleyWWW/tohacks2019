fetch("http://localhost:3000/", {
    mode: 'cors'
}).then(function (data) {
    return data.text();
}).then(function (body) {
    console.log(body);
    document.getElementById("output").innerHTML = body;
})
