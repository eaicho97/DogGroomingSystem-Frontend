// Definir la URL del API Gateway
const API_GATEWAY_URL = 'http://localhost:8762';

// Función para agregar un nuevo propietario
async function addOwner() {
    const ownerPhone = document.getElementById('ownerPhone').value;
    const ownerName = document.getElementById('ownerName').value;

    const ownerData = {
        phone: ownerPhone,
        name: ownerName
    };

    try {
        const response = await fetch(`${API_GATEWAY_URL}/owner/api/v1/owners`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ownerData)
        });

        if (response.ok) {
            alert('Owner added successfully');
            loadOwners(); // Cargar la lista de propietarios actualizada
        } else {
            const error = await response.json();
            alert(`Failed to add owner: ${error.message}`);
        }
    } catch (error) {
        console.error('Error adding owner:', error);
        alert('An error occurred while adding the owner.');
    }
}

async function loadOwners() {
    try {
        const response = await fetch(`${API_GATEWAY_URL}/owner/api/v1/ownersa`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const owners = await response.json();
            const ownersList = document.getElementById('owners-list');
            ownersList.innerHTML = owners.map(owner => 
                `<p>${owner.name} - ${owner.phone}</p>`
            ).join('');
        } else {
            const error = await response.json();
            alert(`Failed to load owners: ${error.message}`);
        }
    } catch (error) {
        console.error('Error loading owners:', error);
        alert('An error occurred while loading the owners.');
    }
}

async function addDog() {
    const dogName = document.getElementById('dogName').value;
    const dogBreed = document.getElementById('dogBreed').value;
    const ownerPhoneForDog = document.getElementById('ownerPhoneForDog').value;

    const dogData = {
        name: dogName,
        breed: dogBreed,
        ownerPhone: ownerPhoneForDog
    };

    try {
        const response = await fetch(`${API_GATEWAY_URL}/dog/api/v1/dogs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dogData)
        });

        if (response.ok) {
            alert('Dog added successfully');
            loadDogs(); 
        } else {
            const error = await response.json();
            alert(`Failed to add dog: ${error.message}`);
        }
    } catch (error) {
        console.error('Error adding dog:', error);
        alert('An error occurred while adding the dog.');
    }
}

async function loadDogs() {
    try {
        const response = await fetch(`${API_GATEWAY_URL}/dog/api/v1/dogs`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const dogs = await response.json();
            const dogsList = document.getElementById('dogs-list');
            dogsList.innerHTML = dogs.map(dog => 
                `<p>${dog.name} (Breed: ${dog.breed}, Owner Phone: ${dog.ownerPhone})</p>`
            ).join('');
        } else {
            const error = await response.json();
            alert(`Failed to load dogs: ${error.message}`);
        }
    } catch (error) {
        console.error('Error loading dogs:', error);
        alert('An error occurred while loading the dogs.');
    }
}


window.onload = function() {
    loadOwners(); // Cargar la lista de propietarios al inicio
    loadDogs(); // Cargar la lista de perros al inicio
};

