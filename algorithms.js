/* jshint esversion: 6 */

let ref = firebase.database().ref('/algorithms/').orderByChild('name');
let cards = document.getElementById('cards');

ref.once('value').then((snapshot)=>{
    console.log(snapshot.val());

    for (const key in snapshot.val()) {
        let algorithm = snapshot.val()[key];
        cards.appendChild(createAlgorithmCard(algorithm, key));
    }
});

var createAlgorithmCard = function(algorithm, id){
    var container = document.createElement("DIV");
    var header = document.createElement("DIV");
    var icon = document.createElement("I");
    var cardbody = document.createElement("DIV");
    var className = document.createElement("P");
    var strategy = document.createElement("P");
    var bestCase = document.createElement("P");
    var averageCase = document.createElement("P");
    var worstCase = document.createElement("P");
    var pseudocode = document.createElement("P");
    var facts = document.createElement("P");
    
    container.className = "card algo-card";
    header.className = "card-header";
    icon.className = "fa fa-edit float-right icon-button";
    cardbody.className = "card-body";
    
    header.innerHTML = algorithm.name;

    className.innerHTML = "Class: " + algorithm.class;
    strategy.innerHTML = "Strategy: " + algorithm.strategy;
    bestCase.innerHTML = "Best case asyptotic complexity:" + algorithm.bestCase;
    averageCase.innerHTML = "Average case asyptotic complexity" + algorithm.averageCase;
    worstCase.innerHTML = "Worst case asyptotic complexity" + algorithm.worstCase;
    pseudocode.innerHTML = "Pseuodcode: " + algorithm.pseudocode;
    facts.innerHTML = "Facts: " + algorithm.facts;

    icon.addEventListener('click', () => {
        sessionStorage.setItem('editAlgorithmId', id);
        window.location = "addalgorithm.html";
    });

    header.appendChild(icon);

    cardbody.append(className);
    cardbody.append(strategy);
    cardbody.append(bestCase);
    cardbody.append(averageCase);
    cardbody.append(worstCase);
    cardbody.append(pseudocode);
    cardbody.append(facts);

    container.append(header);
    container.append(cardbody);

    return container;
};