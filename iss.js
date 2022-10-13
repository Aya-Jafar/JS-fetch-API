apiUrl = 'https://api.wheretheiss.at/v1/satellites/25544';

var map = L.map('issMap').setView([0, 0], 1);
var issIcon = L.icon({
    iconUrl: 'icon.png',
    iconSize: [50, 32], 
});


function getISSData() {
    fetch(apiUrl)
        .then((res) => {
            // console.log(res);
            return res.json();

        }).then((data) => {
            // console.log(data.latitude);

            const { latitude, longitude } = data;

            document.getElementById('lat').textContent = `latitude : ${latitude}`;
            document.getElementById('lan').textContent = `longitude : ${longitude}`;


            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([latitude, longitude], { icon: issIcon }).addTo(map)
                .bindPopup(`ISS ${latitude} : ${longitude}`)
                .openPopup();

        }).catch((e) => {
            console.log(e);
        });
}

getISSData();