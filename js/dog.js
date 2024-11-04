const API_GATEWAY_URL = 'http://localhost:8762';

async function addDog() {
    const dogName = document.getElementById('dogName').value;
    const dogBreed = document.getElementById('dogBreed').value;
    const ownerPhone = document.getElementById('ownerPhone').value;

    const dogData = {
        name: dogName,
        breed: dogBreed,
        ownerPhone: ownerPhone
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
            alert('Failed to add dog.');
        }
    } catch (error) {
        console.error('Error adding dog:', error);
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
            dogsList.innerHTML = '';
            dogs.forEach(dog => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${dog.id}</td>
                    <td>${dog.name}</td>
                    <td>${dog.breed}</td>
                    <td>${dog.ownerPhone}</td>
                `;
                dogsList.appendChild(row);
            });
        } else {
            alert('Failed to load dogs.');
        }
    } catch (error) {
        console.error('Error loading dogs:', error);
    }
}

let currentDogId = null;

async function searchDog() {
    const dogId = document.getElementById('searchDogId').value;
    if (!dogId) {
        alert('Please enter a Dog ID to search.');
        return;
    }

    try {
        const response = await fetch(`${API_GATEWAY_URL}/dog/api/v1/dogs/${dogId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const dog = await response.json();
            document.getElementById('dogs-list').innerHTML = `
                <tr>
                    <td>${dog.id}</td>
                    <td>${dog.name}</td>
                    <td>${dog.breed}</td>
                    <td>${dog.ownerPhone}</td>
                </tr>
            `;

            currentDogId = dog.id;
            document.getElementById('editDogName').value = dog.name;
            document.getElementById('editDogBreed').value = dog.breed;
            document.getElementById('editOwnerPhone').value = dog.ownerPhone;
            document.getElementById('edit-dog').style.display = 'block';
        } else {
            alert('Dog not found.');
        }
    } catch (error) {
        console.error('Error searching for dog:', error);
    }
}

async function updateDog() {
    if (!currentDogId){
        alert('No dog selected for update.');
        return;
    }

    const updatedName = document.getElementById('editDogName').value;
    const updatedBreed = document.getElementById('editDogBreed').value;
    const updatedOwnerPhone = document.getElementById('editOwnerPhone').value;

    const updatedDogData = {
        name: updatedName,
        breed: updatedBreed,
        ownerPhone: updatedOwnerPhone
    };

    try{
        const response = await fetch(`${API_GATEWAY_URL}/dog/api/v1/dogs/${currentDogId}`, {
            method: 'PUT',
            headers:{'Content-Type': 'application/json' },
            body: JSON.stringify(updatedDogData)
        });

        if (response.ok){
            alert('Dog updated successfully.');
            loadDogs();
            document.getElementById('edit-dog').style.display = 'none';
        }else{
            alert('Failed to update dog.');
        }
    }catch (error){
        console.error('Error updating owner:', error);
    }
    
}

// Load dogs on page load
window.onload = loadDogs;