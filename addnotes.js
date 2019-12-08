/* jshint esversion: 6 */
let addButton = document.getElementById("addButton");
let deleteButton = document.getElementById("deleteButton");
let titleInput = document.getElementById('titleInput');
let noteTextArea = document.getElementById('noteTextArea');

let ref = firebase.database().ref('/notes/');
var shouldLoadValue = false;

if (sessionStorage.getItem("editNotesId") != null){
    shouldLoadValue = true;
    var noteId = sessionStorage.getItem("editNotesId");
    sessionStorage.removeItem("editNotesId");
    deleteButton.setAttribute('style','');
} 

if (shouldLoadValue){
    ref = firebase.database().ref('/notes/' + noteId);
    ref.once('value').then((snapshot)=>{
        console.log(snapshot.val());
        let note = snapshot.val();
        addButton.innerHTML = "Sumbit changes";
        titleInput.value = note.title;
        noteTextArea.value = note.notemessage;
    });
}

addButton.addEventListener('click', () => {
    console.log("got to here");

    if (shouldLoadValue){
        ref.set({
            title: titleInput.value,
            notemessage: noteTextArea.value
        });
    } else {
        ref.push({
            title: titleInput.value,
            notemessage: noteTextArea.value
        });
    }   
});

deleteButton.addEventListener('click', () => {
    ref.remove();
});
