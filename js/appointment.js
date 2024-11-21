const API_GATEWAY_URL = 'http://localhost:8762';

async function addAppointment() {
    const dogId = document.getElementById('appointmentDogId').value;
    const ownerId = document.getElementById('appointmentOwnerId').value;
    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentTime = document.getElementById('appointmentTime').value;

    const appointmentData = {
        dogId: parseInt(dogId),
        ownerId: parseInt(ownerId),
        date: appointmentDate,
        time: appointmentTime
    };

    try {
        const response = await fetch(`${API_GATEWAY_URL}/appointment/api/v1/appointments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentData)
        });

        if (response.ok) {
            alert('Appointment added successfully');
            loadAppointments();
        } else {
            alert('Failed to add appointment.');
        }
    } catch (error) {
        console.error('Error adding appointment:', error);
    }
}

async function loadAppointments() {
    try {
        const response = await fetch(`${API_GATEWAY_URL}/appointment/api/v1/appointments`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const appointments = await response.json();
            const appointmentsList = document.getElementById('appointments-list');
            appointmentsList.innerHTML = '';
            appointments.forEach(appointment => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${appointment.id}</td>
                    <td>${appointment.dogId}</td>
                    <td>${appointment.ownerId}</td>
                    <td>${appointment.date}</td>
                    <td>${appointment.time}</td>
                `;
                appointmentsList.appendChild(row);
            });
        } else {
            alert('Failed to load appointments.');
        }
    } catch (error) {
        console.error('Error loading appointments:', error);
    }
}

async function searchAppointment() {
    const appointmentId = document.getElementById('searchAppointmentId').value;
    if (!appointmentId) {
        alert('Please enter an Appointment ID to search.');
        return;
    }

    try {
        const response = await fetch(`${API_GATEWAY_URL}/appointment/api/v1/appointments/${appointmentId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const appointment = await response.json();
            document.getElementById('appointments-list').innerHTML = `
                <tr>
                    <td>${appointment.id}</td>
                    <td>${appointment.dogId}</td>
                    <td>${appointment.ownerId}</td>
                    <td>${appointment.date}</td>
                    <td>${appointment.time}</td>
                </tr>
            `;
        } else {
            alert('Appointment not found.');
        }
    } catch (error) {
        console.error('Error searching for appointment:', error);
    }
}

// Load appointments on page load
window.onload = loadAppointments;
