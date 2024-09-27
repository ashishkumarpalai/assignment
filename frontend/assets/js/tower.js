
let editingTowerId = null; // To keep track of the tower being edited

const towerForm = document.getElementById('towerForm');

towerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        towerName: document.getElementById('towerName').value,
        towerNumber: parseInt(document.getElementById('towerNumber').value),
        deliveryTimeline: document.getElementById('deliveryTimeline').value,
        developerId: document.getElementById('developerId').value,
        towerPhase: document.getElementById('towerPhase').value,
        totalFloors: parseInt(document.getElementById('totalFloors').value),
        towerCoreDetails: {
            parkingLevels: parseInt(document.getElementById('parkingLevels').value),
            lobby: document.getElementById('lobby').value,
            totalApartments: parseInt(document.getElementById('totalApartments').value),
            terrace: document.getElementById('terrace').value
        },
        phaseReraNumber: document.getElementById('phaseReraNumber').value,
        duplicateTowerOption: document.getElementById('duplicateTowerOption').checked,
        projectId: document.getElementById('projectId').value,
        currentStatus: document.getElementById('currentStatus').value


    };

    if (editingTowerId) {
        // Update existing tower
        await putData(`https://assignment-x3rl.onrender.com/api/towers/${editingTowerId}`, data);
        editingTowerId = null; // Reset editing ID
    } else {
        // Create new tower
        await postData('https://assignment-x3rl.onrender.com/api/towers', data);
    }
    loadTowers(); // Reload towers after submission
    towerForm.reset(); // Reset the form fields
});

async function loadTowers() {
    const towers = await fetchData('https://assignment-x3rl.onrender.com/api/towers');
    const tableBody = document.getElementById('towersTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear previous rows

    towers.forEach(tower => {
        const row = `<tr>
                    <td>${tower.towerName}</td>
                    <td>${tower.towerNumber}</td>
                    <td>${tower.deliveryTimeline}</td>
                    <td>${tower.developerId}</td>
                    <td>${tower.towerPhase}</td>
                    <td>${tower.totalFloors}</td>
                    <td>${tower.towerCoreDetails.parkingLevels}</td>
                    <td>${tower.towerCoreDetails.lobby}</td>
                    <td>${tower.towerCoreDetails.totalApartments}</td>
                    <td>${tower.towerCoreDetails.terrace}</td>
                    <td>${tower.phaseReraNumber}</td>
                    <td>${tower.duplicateTowerOption ? 'Yes' : 'No'}</td>
                    <td>${tower.projectId}</td>
                    <td>${tower.currentStatus}</td>
                    <td>
                        <button class="edit-button" onclick="editTower('${tower.id}')">Edit</button>
                        <button class="delete-button" onclick="deleteTower('${tower.id}')">Delete</button>
                    </td>
                </tr>`;
        tableBody.innerHTML += row;
    });
}
loadTowers(); // Load towers on page load
async function editTower(id) {
    const tower = await fetchData(`https://assignment-x3rl.onrender.com/api/towers/${id}`);
    document.getElementById('towerName').value = tower.towerName;
    document.getElementById('towerNumber').value = tower.towerNumber;
    document.getElementById('deliveryTimeline').value = tower.deliveryTimeline;
    document.getElementById('developerId').value = tower.developerId;
    document.getElementById('towerPhase').value = tower.towerPhase;
    document.getElementById('totalFloors').value = tower.totalFloors;
    document.getElementById('parkingLevels').value = tower.towerCoreDetails.parkingLevels;
    document.getElementById('lobby').value = tower.towerCoreDetails.lobby;
    document.getElementById('totalApartments').value = tower.towerCoreDetails.totalApartments;
    document.getElementById('terrace').value = tower.towerCoreDetails.terrace;
    document.getElementById('phaseReraNumber').value = tower.phaseReraNumber;
    document.getElementById('duplicateTowerOption').checked = tower.duplicateTowerOption;
    document.getElementById('projectId').value = tower.projectId;
    document.getElementById('currentStatus').value = tower.currentStatus;



    editingTowerId = id; // Set the ID of the tower being edited
    towerForm.querySelector('button[type="submit"]').innerText = "Update Tower"; // Change button text
}

async function deleteTower(id) {
    if (confirm("Are you sure you want to delete this tower?")) {
        await fetch(`https://assignment-x3rl.onrender.com/api/towers/${id}`, {
            method: 'DELETE'
        });
        loadTowers(); // Reload towers after deletion
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

async function putData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
