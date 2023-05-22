const thead = document.getElementById("thead-col");
const tbody = document.getElementById("thead-row");
// const displaycurrCell = document.getElementById("curr");
const boldBtn = document.querySelector(".bold");
const italicBtn = document.querySelector(".italic");
const underlineBtn = document.querySelector(".underlined");
let leftAlignBtn = document.getElementById("left-align");
let rightAlignBtn = document.getElementById("right-align");
let centerAlignBtn = document.getElementById("center-align");
let colorBtn = document.getElementById("textColor");
let bgColorBtn = document.getElementById("bgColor");
let copyBtn = document.getElementById("copyBtn");
let cutBtn = document.getElementById("cutBtn");
let pasteBtn = document.getElementById("pasteBtn");
let fontFamilyBtn = document.getElementById("fontFamily");
let fontSizeBtn = document.getElementById("fontSize");
let cellNo = document.getElementById("currCellVal");
let downloadbtn = document.getElementById("download");
let upload = document.getElementById("upload");



let cols = 26;
let rows = 100;
let currCell;
let msg = {};
let matrix = new Array(rows);
for(let i = 0; i < matrix.length; i++){
    matrix[i] = new Array(cols);
    for(let j = 0; j < matrix[i].length; j++){
        matrix[i][j] = {};
    }
}


//creating heading columns
for(let col = 0; col < cols; col++){
    let th = document.createElement("th");
    th.innerText = String.fromCharCode(65 + col);
    thead.appendChild(th);
}
//
for(let row = 0; row < rows; row++){
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.innerText = row+1;
    tr.appendChild(th);
    
    for(let col = 0; col <cols; col++){
        let td = document.createElement("td");
        td.setAttribute('contenteditable',"true");
        td.setAttribute('spellcheck',"false");
        td.setAttribute('id',`${String.fromCharCode(65 + col)}${row+1}`);
        td.addEventListener('focus',myFunc);
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
}

function myFunc(event){
    currCell = event.target;
    cellNo.innerText = currCell.id;
}
boldBtn.addEventListener('click',()=>{
    if(currCell.style.fontWeight == "bold"){
        currCell.style.fontWeight = "normal";
    }else{
        currCell.style.fontWeight = "bold";
    }
    dataStore(currCell);
});
italicBtn.addEventListener('click',()=>{
    if(currCell.style.fontStyle == "italic"){
        currCell.style.fontStyle = "normal";
    }else{
        currCell.style.fontStyle = "italic";
    }
    dataStore(currCell);
});
underlineBtn.addEventListener('click',()=>{
    if(currCell.style.textDecoration == "underline"){
        currCell.style.textDecoration = null;
    }else{
        currCell.style.textDecoration = "underline";
    }
    dataStore(currCell);
});
leftAlignBtn.addEventListener('click',()=>{
    if(currCell.style.textAlign == "left"){
        currCell.style.textAlign = "normal";
    }else{
        currCell.style.textAlign = "left";
    }
    dataStore(currCell);
});
rightAlignBtn.addEventListener('click',()=>{
    if(currCell.style.textAlign == "right"){
        currCell.style.textAlign = "normal";
    }else{
        currCell.style.textAlign = "right";
    }
    dataStore(currCell);
});
centerAlignBtn.addEventListener('click',()=>{
    if(currCell.style.textAlign == "center"){
        currCell.style.textAlign = "normal";
    }else{
        currCell.style.textAlign = "center";
    }
    dataStore(currCell);
});
colorBtn.addEventListener('input',()=>{
    currCell.style.color = colorBtn.value;
    dataStore(currCell);
});
bgColorBtn.addEventListener('input',()=>{
    currCell.style.background = bgColorBtn.value;
    dataStore(currCell);
});
copyBtn.addEventListener('click',()=>{
    msg = {
        style:currCell.style.cssText,
        text:currCell.innerText
    }
    dataStore(currCell);
});
cutBtn.addEventListener('click',()=>{
    msg = {
        style:currCell.style.cssText,
        text:currCell.innerText
    }
    currCell.style = null;
    currCell.innerText = null;
    dataStore(currCell);
});
pasteBtn.addEventListener('click',()=>{
   currCell.style = msg.style;
   currCell.innerText = msg.text;
   dataStore(currCell);
});
fontFamilyBtn.addEventListener('change',()=>{
    currCell.style.fontFamily = fontFamilyBtn.value;
    dataStore(currCell);
});
fontSizeBtn.addEventListener('change',()=>{
    currCell.style.fontSize = `${fontSizeBtn.value}px`;
    dataStore(currCell);
});

function colorPanel(){
    colorBtn.display = "block";
}


function dataStore(cell){
    let json = {
        id : cell.id,
        style:cell.style.cssText,
        text:cell.innerText,
    }
    let char =  cell.id.slice(0,1);
    let j = char.charCodeAt(0)-65;
    let i = Number.parseInt(cell.id.slice(1))-1;
    matrix[i][j] = json;
}

downloadbtn.addEventListener('click',downloadSheet);

function downloadSheet(){
    
      // Convert JSON data to a string
  const jsonString = JSON.stringify(matrix);

  // Create a Blob with the JSON data and set its MIME type to application/json
  const blob = new Blob([jsonString], { type: "application/json" });

  // Create an anchor element and set its href attribute to the Blob URL
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json"; // Set the desired file name

  // Append the link to the document, click it to start the download, and remove it afterward
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


document.getElementById("jsonFile").addEventListener("change", readJsonFile);

function readJsonFile(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;

      // {id,style,text}
      // Parse the JSON file content and process the data
      try {
        const jsonData = JSON.parse(fileContent);
        console.log("matrix2", jsonData);
        matrix = jsonData;
        jsonData.forEach((row) => {
          row.forEach((cell) => {
            if (cell.id) {
              var myCell = document.getElementById(cell.id);
              myCell.innerText = cell.text;
              myCell.style.cssText = cell.style;
            }
          });
        });
        // Process the JSON data as needed
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  }
}

