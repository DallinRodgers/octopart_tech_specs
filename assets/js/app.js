let fileUploaded = false;
let allItems = [];

const allowedExtensions = ".csv";

// function myFunction() {
//   var uploadedFile = document.getElementById("myFile");
//   var txt = "";
//   document.getElementById("demo").innerHTML = txt;
// }

function handleFiles(files) {
  // Check for the various File API support.
  if (window.FileReader) {
    // FileReader are supported.
    console.log(files);
    // console.log(files[0].name);
    if (files[0].name.includes(allowedExtensions)) {
      getAsText(files[0]);
    } else {
      console.log("please choose .csv");
    }
  } else {
    alert("FileReader are not supported in this browser.");
  }
}

function getAsText(fileToRead) {
  var reader = new FileReader();
  // Read file into memory as UTF-8
  reader.readAsText(fileToRead);
  // Handle errors load
  reader.onload = loadHandler;
  reader.onerror = errorHandler;
}

function loadHandler(event) {
  var csv = event.target.result;
  processData(csv);
}

function processData(csv) {
  var allTextLines = csv.split(/\r\n|\n/);
  var lines = [];
  for (var i = 0; i < allTextLines.length; i++) {
    //   for (var i = 0; i < 10; i++) {
    var data = allTextLines[i].split(";");
    var tarr = [];
    for (var j = 0; j < data.length; j++) {
      tarr.push(data[j]);
    }
    lines.push(tarr);
  }
  //   console.log(lines);
  getMPN(lines);
  createCSV(lines);
}

function getMPN(data) {
  let mpnArray = [];
  for (var i = 0; i < data.length; i++) {
    // console.log(data[i]);
    for (var j = 0; j < data[i].length; j++) {
      dataArray = data[i][j].split(",");
      mpn = dataArray[0];
      //   console.log(mpn);
      mpnArray.push(mpn);
    }
  }
  console.log(mpnArray);
}

function createCSV(arrayOfArrays) {
  let csvContent = "data:text/csv;charset=utf-8";

  arrayOfArrays.forEach(function (rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
  });

  downloadCsv(csvContent);
}

function downloadCsv(csv) {
  var encodedUri = encodeURI(csv);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);

  let dateNow = getDate();

  link.setAttribute("download", `Octopart-${dateNow}.csv`);
  document.body.appendChild(link); // Required for FF

  link.click(); // This will download the data file named "my_data.csv".
}

function errorHandler(evt) {
  if (evt.target.error.name == "NotReadableError") {
    alert("Canno't read file !");
  }
}

function getDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = `${mm}/${dd}/${yyyy}`;
  return today;
}
