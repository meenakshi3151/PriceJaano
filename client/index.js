const onClickedEstimatePrice = () => {
    const area = document.getElementById('uiSqft').value
    const BHK = document.querySelectorAll('.switch-field1 input[type="radio"]')
    const bath = document.querySelectorAll('.switch-field2 input[type="radio"]')
    const price = document.getElementById('uiEstimatedPrice')
    const location = document.getElementById('uiLocations').value
    var selBHK, selBath
    for (i = 0; i < BHK.length; i++) {
        const idOfRadio = BHK[i].id.replace('#', '');
        const bhkopt = document.getElementById(idOfRadio)
        if (bhkopt.checked) {
            selBHK = bhkopt.value
            break
        }
    }
    for (i = 0; i < bath.length; i++) {
        const idOfRadio = bath[i].id.replace('#', '');
        const bathopt = document.getElementById(idOfRadio)
        if (bathopt.checked) {
            selBath = bathopt.value
        }
    }
    console.log("Bathrooms selected is : ", selBath)
    console.log("BHK selected is : ", selBHK)
    console.log("Area entered is : ", area)
    console.log("Locations selected is : ", location)
    if (!selBHK || !area || !selBath || !location) {
        alert("Please enter all the values")
        return
    }
    var url = 'http://127.0.0.1:5000/predict_home_price'
    const jsonData = { sqft: area, location: location, bhk: selBHK, bath: selBath };
    console.log(jsonData)
    var estimatedPrice;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData)
    };
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            estimatedPrice = data.estimated_price
            price.innerHTML = estimatedPrice

        })
        .catch(error => {
            console.error('Fetch error:', error);
        });




}

function payLoad() {
    console.log("HI! Welcome to the website");
    const url = 'http://127.0.0.1:5000/get_location_names';
    const locationsInputBox = document.getElementById('uiLocations');
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched location names:', data);
            if (locationsInputBox) {
                locationsInputBox.innerHTML = data.locations.map(location => `<option>${location}</option>`).join('');
            }
        })
        .catch(error => {
            console.error('Error fetching location names:', error);
        });
    
}

window.onload = payLoad()