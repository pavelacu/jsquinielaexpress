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

function shuffle(array) {
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
	setHeadTable() 
	let arraysort = shuffle(arrayparticipants)		
	for (var i = 0; i < arraysort.length; i++) {
			addRowResult(arrayresults[i],arraysort[i]);
	}	
	showDate();
	
}

function showDate(){
	var label = document.getElementById("labelDate")
	var now = new Date();
	console.log(navigator.languages);
	label.innerHTML = now.toLocaleString();
}

function cleanTable(){
	var table = document.getElementById("myTableSort").getElementsByTagName('tbody')[0];		
	table.innerHTML = "";
	var tableh = document.getElementById("myTableSort").getElementsByTagName('thead')[0];
	tableh.innerHTML = "";
}

function showMessage(message){
	var message = document.getElementById("messageDuplicate")
	message.innerHTML = "<div class=\"alert alert-warning\"><strong>Precaucion!</strong>"+message+"</div>";	
}


function cleanMessage(){
	var table = document.getElementById("messageDuplicate")
	table.innerHTML = "";	
}

function add() {

	cleanMessage()
    var participant = document.getElementById("participant").value;
	if (participant){
		if (exists(arrayparticipants,participant)=== false){
			arrayparticipants.push(participant);
			addRowParticipant(participant)
			document.getElementById("participant").value = '';
		}else{
			console.log('Ya existe')
			showMessage("El participante ya existe.")
			
		}		
    }	 
}

function exportImage(){
	 html2canvas(document.querySelector("#result")).then(canvas => {
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
  cell2.innerHTML = "<button type=\"button\" onclick=\"removeRowParticipant('"+name+"')\" class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-remove\"></span>X</button>";  
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
  var table = document.getElementById("myTableSort");
  var header = table.createTHead();
  var row = header.insertRow(0);
  var cell1 = row.insertCell(0);  
  var cell2 = row.insertCell(1);
  var local = document.getElementById("local").value;
  var visit = document.getElementById("visit").value;
  
  cell1.innerHTML ='<b>'+ local +' vs. '+visit+'</b>';  
  cell2.innerHTML = '<b>Participant</b>';
}
