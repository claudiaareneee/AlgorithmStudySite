/* jshint esversion: 6 */

let ref = firebase.database().ref('/notes/');
let cards = document.getElementById('cards');

ref.once('value').then((snapshot)=>{
    console.log(snapshot.val());

    for (const key in snapshot.val()) {
        let note = snapshot.val()[key];
        cards.appendChild(creatNoteCard(note, key));
    }
});

var creatNoteCard = function(note, id){
    var container = document.createElement("DIV");
    var header = document.createElement("DIV");
    var icon = document.createElement("I");
    var cardbody = document.createElement("DIV");
    var notes = document.createElement("P");
    
    container.className = "card algo-card";
    header.className = "card-header";
    icon.className = "fa fa-edit float-right icon-button";
    cardbody.className = "card-body";
    
    header.innerHTML = note.title;

    notes.innerHTML = note.notemessage;

    icon.addEventListener('click', () => {
        sessionStorage.setItem('editNotesId', id);
        window.location = "addnotes.html";
    });

    header.appendChild(icon);

    cardbody.append(notes);

    container.append(header);
    container.append(cardbody);

    return container;
};