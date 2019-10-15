var tareaOut = document.getElementById("tareaResponse");
const back4appAppId = "BHXc9nFpgFVFSyy9fdPFoyQ22XYVeJmTjBQXItlB";

const back4appApiKey = "VoUZVD7aLj6RdFh6T2swD80ccssc3QIGaaRPyycB";

const url="https://parseapi.back4app.com/classes/Person/";

const responseType = 'json';



var personList = [];



function addPerson(){

    tareaOut.value="addPerson started ...";

    var personName = document.getElementById("nameInNewPerson").value.trim();
    var personAge = document.getElementById("ageInNewPerson").value.trim();
    var personSex = document.getElementById("sexInNewPerson").value.trim();

    /* if(taskName==""){

        tareaOut.value +="\nSorry, nothing to send.\nDone.";

        return;

    } */

    var createdPerson = {name:personName, age:personAge, sex:personSex};

    const data = JSON.stringify(createdPerson);

    var request = new XMLHttpRequest();

    request.open('POST', url, true);

    setupHttpRequest(request);

    request.onload = function() {

        var status = request.status;

        if (status === 201) {

            writeSuccResponse && writeSuccResponse(request.response);
            createdPerson.personId = this.response.objectId;
            personList.push(createdPerson); 
            getPersons();

        } else {

            writeErrMsg && writeErrMsg(status, request.response);

        }

    };

    request.send(data);  
    
   

}



function editPerson(){

    tareaOut.value="editPerson started ...";
    
    var personId = document.getElementById("inPersonIdEdt").value.trim();
    var personName = document.getElementById("nameInPersonIdEdt").value.trim();
    var personAge = document.getElementById("ageInPersonIdEdt").value.trim();
    var personSex = document.getElementById("sexInPersonIdEdt").value.trim();

    if(personId==""){

        tareaOut.value +="\nSorry, no task id specified.\nDone.";

        return;

    }
    

    const data = JSON.stringify({name:personName, age:personAge, sex:personSex});

    var request = new XMLHttpRequest();

    request.open('PUT', url+personId, true);

    setupHttpRequest(request);

    request.onload = function() {

        var status = request.status;

        if (status === 200) {

            writeSuccResponse && writeSuccResponse(request.response);
            getPersons();

        } else {

            writeErrMsg && writeErrMsg(status, request.response);

        }

    };

    request.send(data);  

    
}


function deletePerson(){

    tareaOut.value="deletePerson started ...";

    var taskId = document.getElementById("inPersonIdRem").value.trim();

    if(taskId==""){

        tareaOut.value +="\nSorry, nothing to delete.\nDone.";

        return;

    }

    var request = new XMLHttpRequest();

    request.open('DELETE', url+taskId, true);

    setupHttpRequest(request);
    request.onload = function() {
        var status = request.status;

        if (status === 200) {

            writeSuccResponse && writeSuccResponse(request.response);
            getPersons();

        } else {

            writeErrMsg && writeErrMsg(status, request.response);

        }

    };

    request.send();

    

}


function getPersons(){

    tareaOut.value="getPerson started ...";

    var request = new XMLHttpRequest();

    request.open('GET', url, true);

    setupHttpRequest(request);

    request.onload = function() {

        var status = request.status;

        if (status === 200) {
            writeSuccResponse && writeSuccResponse(request.response);
            const personListElm = document.getElementById('person-list');
            personListElm.innerHTML = '';

            var personList = [];
            persons =  request.response.results;

            for(var i=0; i< persons.length; i++){
                personListElm.innerHTML += `<li>Id : ${persons[i].objectId} Name :${persons[i].name} Age :${persons[i].age} Sex : ${persons[i].sex} </li>`;
                personList.push(persons); 

            }
             
 
        } else {

            writeErrMsg && writeErrMsg(status, request.response);

        }

    };

    request.send();

}

function writeSuccResponse(response){
    console.log(response);
    tareaOut.value="SUCCESS. \n\nResponse:\n"+JSON.stringify(response);



}

function writeErrMsg(status, response){
    tareaOut.value="ERROR \nStatus:"+status+"\nResponse: "+response;



}

function setupHttpRequest(request) {
    request.responseType = responseType;
    request.setRequestHeader("X-Parse-Application-Id",back4appAppId);
    request.setRequestHeader("X-Parse-REST-API-Key",back4appApiKey);

}