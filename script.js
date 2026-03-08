const noteInput = document.getElementById("noteInput");
const notesContainer = document.getElementById("notes");
const search = document.getElementById("search");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes(){

localStorage.setItem("notes",JSON.stringify(notes));

}

function renderNotes(filter=""){

notesContainer.innerHTML="";

notes
.filter(note=>note.toLowerCase().includes(filter.toLowerCase()))
.forEach((note,index)=>{

const div = document.createElement("div");

div.className="note";

div.innerHTML = `
<span contenteditable="true" oninput="editNote(${index},this.innerText)">
${note}
</span>
<button class="delete" onclick="deleteNote(${index})">X</button>
`;

notesContainer.appendChild(div);

});

}

function addNote(){

const note = noteInput.value.trim();

if(note==="") return;

notes.push(note);

noteInput.value="";

saveNotes();

renderNotes();

}

function deleteNote(index){

notes.splice(index,1);

saveNotes();

renderNotes();

}

function editNote(index,newText){

notes[index]=newText;

saveNotes();

}

search.addEventListener("input",(e)=>{

renderNotes(e.target.value);

});

renderNotes();