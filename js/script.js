const API_GATEWAY_URL = 'http://localhost:8762';

async function addOwner() {
    const ownerPhone = document.getElementById('ownerPhone').value;
    const ownerName = document.getElementById('ownerName').value;
    
    const ownerData = { phone: ownerPhone, name: ownerName };

    try {
        const response = await fetch(`${API_GATEWAY_URL}/owner/api/v1/owners`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ownerData)
        });

        if (response.ok) {
            alert('Dueño agregado exitosamente');
            loadOwners();
        } else {
            alert('Error al agregar dueño');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function modifyOwner() {
    const ownerPhone = document.getElementById('ownerPhone').value;
    const newOwnerName = prompt("Introduce el nuevo nombre del dueño:");

    try {
        const response = await fetch(`${API_GATEWAY_URL}/owner/api/v1/owners/${ownerPhone}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newOwnerName })
        });

        if (response.ok) alert('Dueño modificado');
    } catch (error) {
        console.error('Error al modificar dueño:', error);
    }
}

async function deleteOwner() {
    const ownerPhone = document.getElementById('ownerPhone').value;

    try {
        await fetch(`${API_GATEWAY_URL}/owner/api/v1/owners/${ownerPhone}`, { method: 'DELETE' });
        alert('Dueño eliminado');
    } catch (error) {
        console.error('Error:', error);
    }
}

async function searchOwner() {
    const ownerPhone = document.getElementById('ownerPhone').value;

    try {
        const response = await fetch(`${API_GATEWAY_URL}/owner/api/v1/owners/${ownerPhone}`);
        const owner = await response.json();
        alert(`Dueño: ${owner.name}, Teléfono: ${owner.phone}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function addDog() {
    const dogName = document.getElementById('dogName').value;
    const dogBreed = document.getElementById('dogBreed').value;
    const ownerPhoneForDog = document.getElementById('ownerPhoneForDog').value;

    const dogData = { name: dogName, breed: dogBreed, ownerPhone: ownerPhoneForDog };

    try {
        const response = await fetch(`${API_GATEWAY_URL}/dog/api/v1/dogs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dogData)
        });

        if (response.ok) alert('Perro agregado');
    } catch (error) {
        console.error('Error:', error);
    }
}

async function scheduleAppointment() {
    const dogName = document.getElementById("appointmentDogName").value;
    const ownerPhone = document.getElementById("appointmentOwnerPhone").value;
    const date = document.getElementById("appointmentDate").value;

    try {
        const response = await fetch(`${API_GATEWAY_URL}/appointments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dogName, ownerPhone, date })
        });

        if (response.ok) alert('Cita agendada exitosamente');
    } catch (error) {
        console.error('Error al agendar cita:', error);
    }
}

window.onload = function() {
    loadOwners();
    loadDogs();
};