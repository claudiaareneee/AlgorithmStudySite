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
    var asyptoticComplexitiesLabel = document.createElement("P");
    var asyptoticComplexities = document.createElement("UL");
    var bestCase = document.createElement("li");
    var averageCase = document.createElement("li");
    var worstCase = document.createElement("li");
    var pseudocode = document.createElement("P");
    var facts = document.createElement("P");
    
    container.className = "card algo-card";
    header.className = "card-header";
    icon.className = "fa fa-edit float-right icon-button";
    cardbody.className = "card-body";
    
    header.innerHTML = algorithm.name;

    className.innerHTML = "Class: " + algorithm.class;
    strategy.innerHTML = "Strategy: " + algorithm.strategy;
    asyptoticComplexitiesLabel.innerHTML = "Asyptotic Complexites: ";
    bestCase.innerHTML = "Best case: " + algorithm.bestCase;
    averageCase.innerHTML = "Average case: " + algorithm.averageCase;
    worstCase.innerHTML = "Worst case: " + algorithm.worstCase;
    pseudocode.innerHTML = "Pseuodcode: <pre><code>" + algorithm.pseudocode + "</pre></code>";
    var factsText = algorithm.facts.replace(/\n/g, "<br />");
    facts.innerHTML = "Facts: "+ '<br>' + factsText;

    icon.addEventListener('click', () => {
        sessionStorage.setItem('editAlgorithmId', id);
        window.location = "addalgorithm.html";
    });

    header.appendChild(icon);
    asyptoticComplexities.appendChild(bestCase);
    asyptoticComplexities.appendChild(averageCase);
    asyptoticComplexities.appendChild(worstCase);

    cardbody.append(className);
    cardbody.append(strategy);
    cardbody.append(asyptoticComplexitiesLabel);
    cardbody.append(asyptoticComplexities);
    cardbody.append(pseudocode);
    cardbody.append(facts);

    container.append(header);
    container.append(cardbody);

    return container;
};

