var myAPI = '362bb816f1c458f89a42e167fbdded5a';
function loadCity() {
    const searchField = document.getElementById('search-field');
    let searchedCity = searchField.value;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&appid=${myAPI}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCity(data[0]));
    searchField.value = '';
    document.getElementById('img-div').innerHTML = '';
}
function displayCity(city) {
    if (city == undefined) {
        alert('INVALID INPUT! PLEASE ENTER A CITY NAME')
    }
    else {
        const resultArea = document.getElementById('result-area');

        const { lat } = city;
        const { lon } = city;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myAPI}`;
        fetch(url)
            .then(res => res.json())
            .then(data => temparatureData(data))

        resultArea.innerHTML = `
        <div id="result">
            <p>${city.name}</p>
        </div>
    `;
    }
}
function temparatureData(tempData) {
    const imgDiv = document.getElementById('img-div');
    console.log(tempData);
    const { temp } = tempData.main;
    const celcius = parseInt(temp - 273.15);
    const des = tempData.weather[0].description;
    if (tempData.weather[0].main == 'Haze') {

        imgDiv.innerHTML = `
        <img src="https://i.ibb.co/TtPVzhG/02d-2x.png" alt="haze" border="0">
        <small style="text-align:center;display:block;color:#C82333;">${des}</small>
        `;
    }
    if (tempData.weather[0].main == 'Clear') {
        imgDiv.innerHTML = `
        <img src="https://i.ibb.co/VxWsR7L/clear.png" alt="clear" border="0">
        <small style="text-align:center;display:block;color:#C82333;">${des}</small>
        `;
    }
    if (tempData.weather[0].main == 'Clouds') {
        imgDiv.innerHTML = `
        <img src="https://i.ibb.co/PZ44qcV/cloud.png" alt="cloud" border="0">
        <small style="text-align:center;display:block;color:#C82333;">${des}</small>
        `;
    }
    if (tempData.weather[0].main == 'Rain') {
        imgDiv.innerHTML = `
        <img src="https://i.ibb.co/dD3PqMf/rain.png" alt="rain" border="0">
        <small style="text-align:center;display:block;color:#C82333;">${des}</small>
        `;
    }
    if (tempData.weather[0].main == 'Smoke') {
        imgDiv.innerHTML = `
        <img src="https://i.ibb.co/zH86pKk/smoke-raw-1.png" alt="smoke-raw-1" border="0">
        <small style="text-align:center;display:block;color:#C82333;">${des}</small>
        `;
    }


    const result = document.getElementById('result');
    const p = document.createElement('p');
    p.innerHTML = `
        ${celcius} &#176C
    `;
    result.appendChild(p);
}