const contentSection = document.getElementById('group');
const buttonContainer = document.querySelector('.button-container');

let dataCounter = 0;

function loadData(){
    for(i = 0; i < 6; i++){
        city = database[dataCounter].city;
        street = database[dataCounter].street;
        img = database[dataCounter].img;
        
        let element = document.createElement('div');
        element.classList.add('element');
        element.setAttribute("id", dataCounter);
        element.setAttribute("onclick", "loadDetails(event)");
        element.innerHTML = '<img src='+img+'><div class="text-container"><h2 class="title">'+city+', '+street+'</h2><p class="more">Więcej informacji</p></div>';

        contentSection.appendChild(element); 
        
        dataCounter++;

        if(dataCounter == database.length){
            buttonContainer.innerHTML = "-koniec-";
            return;
        }
    }
    buttonContainer.innerHTML = '<button id="load" class="load" onclick="loadButton()">Załaduj Więcej</button>';
}

function loadButton(){
    let targetId = dataCounter;
    loadData();
    let target = document.getElementById(targetId);
    target.scrollIntoView({behavior: "smooth", block: "start"});
    //window.scrollTo(0,document.body.scrollHeight);
}

let serachInput = document.getElementById('search');
serachInput.addEventListener('keyup', ()=>{
    searchLoad();
})

function searchLoad(){
    searchValue = serachInput.value;
    contentSection.innerHTML = "";

    if(searchValue == "") return dataCounter = 0, loadData();
    
    let results = [];

    database.forEach(item => {
        if(item.tag.includes(searchValue.toLowerCase()) == true) return results.push(item);
        if(item.city.includes(searchValue) == true) return results.push(item);
        if(item.street.includes(searchValue) == true) return results.push(item);
    })

    results.forEach(item => {
        city = item.city;
        street = item.street;
        img = item.img;
        
        let element = document.createElement('div');
        element.classList.add('element');
        element.setAttribute("id", database.indexOf(item));
        element.setAttribute("onclick", "loadDetails(event)");
        element.innerHTML = '<img src='+img+'><div class="text-container"><h2 class="title">'+city+', '+street+'</h2><p class="more">Więcej informacji</p></div>';

        contentSection.appendChild(element); 
    })

    buttonContainer.innerHTML = "-koniec-";

}

const detailsElement = document.querySelector('.details-container');

const detailsCityEL = document.getElementById('city');
const detailsStreetEL = document.getElementById('street');
const detailsImgEL = document.getElementById('image');
const detailsAuthorEL = document.getElementById('author');

function loadDetails(event){
    detailsId = event.currentTarget.id;

    detailsCity = database[detailsId].city;
    detailsStreet = database[detailsId].street;
    detailsImg = database[detailsId].img;
    detailsLat = database[detailsId].lat;
    detailsLong = database[detailsId].long;
    detailsAuthor = database[detailsId].author;

    detailsCityEL.innerHTML = detailsCity;
    detailsStreetEL.innerHTML = detailsStreet;
    detailsAuthorEL.innerHTML = detailsAuthor;
    detailsImgEL.setAttribute("src", detailsImg);

    

    locationMap.setView([detailsLat, detailsLong], 13);
    marker.setLatLng([detailsLat, detailsLong]);

    detailsElement.classList.remove('hidden');
}

let closeTrigger = document.getElementById('closeTrigger');
closeTrigger.onclick = closeDetails;

function closeDetails(){
    detailsElement.classList.add('hidden');
}

window.onload = loadData();

/////////////////////////MAP\\\\\\\\\\\\\\\\\\\\\\\\\

var locationMap = L.map('locationMap').setView([0, 0], 13);
const marker = L.marker([0,0]).addTo(locationMap);

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(locationMap);