/* jshint esversion: 6 */
let addButton = document.getElementById("addButton");
let nameInput = document.getElementById('nameInput');
let classInput = document.getElementById('classInput');
let strategyOption = document.getElementById('strategyOption');
let worstCaseOption = document.getElementById('worstCaseOption');
let averageCaseOption = document.getElementById('worstCaseOption');
let bestCaseOption = document.getElementById('worstCaseOption');
let algorithmTestArea = document.getElementById('algorithmTestArea');
let factsTestArea = document.getElementById('factsTestArea');

let db = firebase.database().ref('/algorithms/');

addButton.addEventListener('click', () => {
    console.log("got to here");
    
    db.push({
        name: nameInput.value,
        class: classInput.value,
        strategy: strategyOption.value,
        worstCase: worstCaseOption.value,
        averageCase: averageCaseOption.value,
        bestCase: bestCaseOption.value,
        pseudocode: algorithmTestArea.value,
        facts: factsTestArea.value
    });
});

