'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


// getCurrentPosition(success)
// getCurrentPosition(success, error)
// getCurrentPosition(success, error, options)
let map, mapEvent;
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        // success
        function(position){
            // console.log(position);
            // const {latitude} = position.coords;
            // const {longitude} = position.coords;
            const {latitude,longitude} = position.coords;
            console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
            const coords = [latitude,longitude];

            map = L.map('map').setView(coords, 13);
            // console.log(map);
            // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // }).addTo(map);

            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // L.marker(coords).addTo(map)
            //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            //     .openPopup();

            map.on('click',function(mapE){
                mapEvent = mapE;
                form.classList.remove('hidden');
                inputDistance.focus();
                // console.log(mapEvent);
                // const {lat,lng} = mapEvent.latlng;
                // // L.marker([lat,lng]).addTo(map)
                // // .bindPopup('Workout')
                // // .openPopup();
                // L.marker([lat,lng]).addTo(map)
                // .bindPopup(L.popup({
                //     maxWidth:250,
                //     minWidth:100,
                //     autoClose:false,
                //     closeOnClick:false,
                //     className:'running-popup'
                // }))
                // .setPopupContent('Workout')
                // .openPopup();
            })
        },
        // error
        function(){
            alert('Could not get your position');
        }
        //options
    );

    form.addEventListener('submit',function(e){
        e.preventDefault();
        console.log(mapEvent);
        const {lat,lng} = mapEvent.latlng;

        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
        // L.marker([lat,lng]).addTo(map)
        // .bindPopup('Workout')
        // .openPopup();
        L.marker([lat,lng]).addTo(map)
        .bindPopup(L.popup({
            maxWidth:250,
            minWidth:100,
            autoClose:false,
            closeOnClick:false,
            className:'running-popup'
        }))
        .setPopupContent('Workout')
        .openPopup();
    })
}

inputType.addEventListener('change',function(){
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});