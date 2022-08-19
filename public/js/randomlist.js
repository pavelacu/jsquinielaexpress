let arrayparticipants = []
let arrayresults = ['0-0','0-1','1-0','1-1','2-0','0-2','2-1','1-2','2-2','3-0','0-3',
'3-1','1-3','2-3','3-2','3-3','4-0','0-4','4-1','1-4','4-2','2-4','3-4','4-3','4-4','5-0',
'0-5','5-1','1-5','5-2','2-5','5-3','3-5','5-4','4-5','5-5']


const elem = document.getElementById("participant");
elem.addEventListener("keypress", (event)=> {
    if (event.keyCode === 13) { // key code of the keybord key
      event.preventDefault();
	  add();
    }
  });

function shuffle(arrayValue) {
	let array = arrayValue.slice();
	  let currentIndex = array.length,  randomIndex;

	  // While there remain elements to shuffle.
	  while (currentIndex != 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
		  array[randomIndex], array[currentIndex]];
	  }

  return array;
}


function getListShuffle() {
	cleanTable()
	if(setHeadTable()){
		let arraysort = shuffle(arrayparticipants)		
		for (var i = 0; i < arraysort.length; i++) {
				addRowResult(arrayresults[i],arraysort[i]);
		}	
		showDate();
	}
}



function showDate(){
	var label = document.getElementById("labelDate")
	var now = new Date();
	//console.log(navigator.languages);
	label.innerHTML = now.toLocaleString();
}

function cleanTable(){
	var table = document.getElementById("myTableSort").getElementsByTagName('tbody')[0];		
	table.innerHTML = "";
	var tableh = document.getElementById("myTableSort").getElementsByTagName('thead')[0];
	tableh.innerHTML = "";
}

function cleanLoading(){
	var table = document.getElementById("loaderDiv");		
	table.innerHTML = "";	
}

function showLoading(){
	var messageHtml = document.getElementById("loaderDiv")	
	var textHtml = "<span class=\"loader\"> </span>";			
	messageHtml.innerHTML = textHtml;
	cleanLoading()
}


function showMessage(htmldiv, message){
	var messageHtml = document.getElementById(htmldiv)	
	var textHtml = "<div class=\"alert alert-warning\"><strong>Precaucion!</strong> "+message+"</div>";			
	messageHtml.innerHTML = textHtml;	
}


function cleanMessage(htmlDiv){
	var table = document.getElementById(htmlDiv)
	table.innerHTML = "";	
}

function add() {

	cleanMessage("messageDuplicate")
    var participant = document.getElementById("participant").value;
	if (participant){
		if (exists(arrayparticipants,participant)=== false){
			arrayparticipants.push(participant);
			addRowParticipant(participant)
			document.getElementById("participant").value = '';
		}else{
			console.log('Ya existe')
			showMessage("messageDuplicate","El participante ya existe.")
			
		}		
    }	 
}

function exportImage(){
	 html2canvas(document.querySelector("#divresults")).then(canvas => {
		//document.body.appendChild(canvas)
		var a = document.createElement('a');
				a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
				a.download = 'Quiniela'+getDateLabel()+'.jpg';
				a.click();
	});
 }
 

 
function getDateLabel(){
	var label = document.getElementById("labelDate");
	let str = label.innerHTML	
	return str.replace(/\D/g, '')
}


function exists(arrnames,name) {
	for (var i = 0; i < arrnames.length; i++) {
		if(arrnames[i].toUpperCase() == name.toUpperCase()){
			return true;
		}
	}
    return  false;
}


function findParticipant(arrnames,name) {
	for (var i = 0; i < arrnames.length; i++) {
		if(arrnames[i].toUpperCase() == name.toUpperCase()){
			return i;
		}
	}
    return -1;
}

function addRowParticipant(name) {
  var table = document.getElementById("myTable").getElementsByTagName('tbody')[0];
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0); 
  var cell2 = row.insertCell(1);
  cell1.innerHTML = name;  
  cell2.innerHTML = "<button type=\"button\" onclick=\"removeRowParticipant('"+name+"')\" class=\"btn\"><i class=\"fa fa-trash\"></i></button>";  
}

function addRowResult(result, name) {
  var table = document.getElementById("myTableSort").getElementsByTagName('tbody')[0];
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);  
  var cell2 = row.insertCell(1);
  cell1.innerHTML = result;  
  cell2.innerHTML = name;
}


function removeRowParticipant(name) {	  
  var idParticipant = arrayparticipants.indexOf(name);
  var sizevar = arrayparticipants.length
  document.getElementById("myTable").deleteRow(sizevar-idParticipant); 
  arrayparticipants.splice(idParticipant, 1);
}

function setHeadTable() {
  var local = document.getElementById("local").value;
  var visit = document.getElementById("visit").value;
  cleanMessage("messageTeams")
  if(local && visit){
		
		setTimeout(showLoading(), 30000);
		var table = document.getElementById("myTableSort");
		var header = table.createTHead();		
		var row = header.insertRow(0);
		var cell1 = row.insertCell(0);  
		var cell2 = row.insertCell(1);	
	    var htmltitle1 = local +" vs. "+visit;	  
		cell1.innerText = htmltitle1;
		cell2.innerText = 'Participante';

  }else{
	  showMessage("messageTeams","Ingresa los equipos")
	  return false;
  }
  return true;
}
