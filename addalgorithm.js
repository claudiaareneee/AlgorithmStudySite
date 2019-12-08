/* jshint esversion: 6 */
let addButton = document.getElementById("addButton");
let nameInput = document.getElementById('nameInput');
let classInput = document.getElementById('classInput');
let strategyOption = document.getElementById('strategyOption');
let worstCaseOption = document.getElementById('worstCaseOption');
let averageCaseOption = document.getElementById('averageCaseOption');
let bestCaseOption = document.getElementById('bestCaseOption');
let algorithmTestArea = document.getElementById('algorithmTestArea');
let factsTestArea = document.getElementById('factsTestArea');

let ref = firebase.database().ref('/algorithms/');
var shouldLoadValue = false;

if (sessionStorage.getItem("editAlgorithmId") != null){
    shouldLoadValue = true;
    var algorithmId = sessionStorage.getItem("editAlgorithmId");
    sessionStorage.removeItem("editAlgorithmId");
} 

if (shouldLoadValue){
    ref = firebase.database().ref('/algorithms/' + algorithmId);
    ref.once('value').then((snapshot)=>{
        console.log(snapshot.val());
        let algorithm = snapshot.val();
        addButton.innerHTML = "Sumbit changes";
        nameInput.value = algorithm.name;
        classInput.value = algorithm.class;
        strategyOption.value = algorithm.strategy;
        worstCaseOption.value = algorithm.worstCase;
        averageCaseOption.value = algorithm.averageCase;
        bestCaseOption.value = algorithm.bestCase;
        algorithmTestArea.value = algorithm.pseudocode;
        factsTestArea.value = algorithm.facts;
    });
}

addButton.addEventListener('click', () => {
    console.log("got to here");

    if (shouldLoadValue){
        ref.set({
            name: nameInput.value,
            class: classInput.value,
            strategy: strategyOption.value,
            worstCase: worstCaseOption.value,
            averageCase: averageCaseOption.value,
            bestCase: bestCaseOption.value,
            pseudocode: algorithmTestArea.value,
            facts: factsTestArea.value
        });
    } else {
        ref.push({
            name: nameInput.value,
            class: classInput.value,
            strategy: strategyOption.value,
            worstCase: worstCaseOption.value,
            averageCase: averageCaseOption.value,
            bestCase: bestCaseOption.value,
            pseudocode: algorithmTestArea.value,
            facts: factsTestArea.value
        });
    }   
});

