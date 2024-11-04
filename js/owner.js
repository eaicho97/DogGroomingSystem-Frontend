const API_GATEWAY_URL = 'http://localhost:8762';

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
            loadOwners();
        } else {
            alert('Failed to add owner.');
        }
    } catch (error) {
        console.error('Error adding owner:', error);
    }
}

async function loadOwners() {
    try {
        const response = await fetch(`${API_GATEWAY_URL}/owner/api/v1/owners`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const owners = await response.json();
            const ownersList = document.getElementById('owners-list');
            ownersList.innerHTML = '';
            owners.forEach(owner => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${owner.id}</td>
                    <td>${owner.name}</td>
                    <td>${owner.phone}</td>
                `;
                ownersList.appendChild(row);
            });
        } else {
            alert('Failed to load owners.');
        }
    } catch (error) {
        console.error('Error loading owners:', error);
    }
}

let currentOwnerId = null; // Variable para almacenar el ID del Owner actual

async function searchOwner() {
    const ownerId = document.getElementById('searchOwnerId').value;
    if (!ownerId) {
        alert('Please enter an Owner ID to search.');
        return;
    }

    try {
        const response = await fetch(`${API_GATEWAY_URL}/owner/api/v1/owners/${ownerId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const owner = await response.json();
            document.getElementById('owners-list').innerHTML = `
                <tr>
                    <td>${owner.id}</td>
                    <td>${owner.name}</td>
                    <td>${owner.phone}</td>
                </tr>
            `;

            // Muestra los campos de edición y carga los datos actuales del owner
            currentOwnerId = owner.id;
            document.getElementById('editOwnerName').value = owner.name;
            document.getElementById('editOwnerPhone').value = owner.phone;
            document.getElementById('edit-owner').style.display = 'block';
        } else {
            alert('Owner not found.');
        }
    } catch (error) {
        console.error('Error searching for owner:', error);
    }
}

async function updateOwner() {
    if (!currentOwnerId) {
        alert('No owner selected for update.');
        return;
    }

    const updatedName = document.getElementById('editOwnerName').value;
    const updatedPhone = document.getElementById('editOwnerPhone').value;

    const updatedOwnerData = {
        name: updatedName,
        phone: updatedPhone
    };

    try {
        const response = await fetch(`${API_GATEWAY_URL}/owner/api/v1/owners/${currentOwnerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedOwnerData)
        });

        if (response.ok) {
            alert('Owner updated successfully.');
            loadOwners(); // Actualiza la lista
            document.getElementById('edit-owner').style.display = 'none'; // Oculta el formulario de edición
        } else {
            alert('Failed to update owner.');
        }
    } catch (error) {
        console.error('Error updating owner:', error);
    }
}

// Load owners on page load
window.onload = loadOwners;