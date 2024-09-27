
let editingSeriesId = null; // To keep track of the series being edited

const seriesForm = document.getElementById('seriesForm');

seriesForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        seriesName: document.getElementById('seriesName').value,
        towerId: document.getElementById('towerId').value,
        seriesTypology: document.getElementById('seriesTypology').value,
        seriesDetails: {
            bed: parseInt(document.getElementById('bed').value),
            dimension: document.getElementById('dimension').value,
            bath: parseInt(document.getElementById('bath').value),
            direction: document.getElementById('direction').value
        },
        addOns: document.getElementById('addOns').value.split(',').map(addon => addon.trim())
    };

    if (editingSeriesId) {
        // Update existing series
        await putData(`https://assignment-x3rl.onrender.com/api/series/${editingSeriesId}`, data);
        editingSeriesId = null; // Reset editing ID
    } else {
        // Create new series
        await postData('https://assignment-x3rl.onrender.com/api/series', data);
    }
    loadSeries(); // Reload series after submission
    seriesForm.reset(); // Reset the form fields
});

async function loadSeries() {
    const series = await fetchData('https://assignment-x3rl.onrender.com/api/series');
    const tableBody = document.getElementById('seriesTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear previous rows

    series.forEach(series => {
        const row = `<tr>
                    <td>${series.seriesName}</td>
                    <td>${series.towerId}</td>
                    <td>${series.seriesTypology}</td>
                    <td>${series.seriesDetails.bed}</td>
                    <td>${series.seriesDetails.dimension}</td>
                    <td>${series.seriesDetails.bath}</td>
                    <td>${series.seriesDetails.direction}</td>
                    <td>${series.addOns.join(', ')}</td>
                    <td>
                        <button class="edit-button" onclick="editSeries('${series.id}')">Edit</button>
                        <button class="delete-button" onclick="deleteSeries('${series.id}')">Delete</button>
                    </td>
                </tr>`;
        tableBody.innerHTML += row;
    });
}
// Load series on page load
loadSeries();

async function editSeries(id) {
    const series = await fetchData(`https://assignment-x3rl.onrender.com/api/series/${id}`);
    document.getElementById('seriesName').value = series.seriesName;
    document.getElementById('towerId').value = series.towerId;
    document.getElementById('seriesTypology').value = series.seriesTypology;
    document.getElementById('bed').value = series.seriesDetails.bed;
    document.getElementById('dimension').value = series.seriesDetails.dimension;
    document.getElementById('bath').value = series.seriesDetails.bath;
    document.getElementById('direction').value = series.seriesDetails.direction;
    document.getElementById('addOns').value = series.addOns.join(', ');

    editingSeriesId = id; // Set the ID of the series being edited
    seriesForm.querySelector('button[type="submit"]').innerText = "Update Series"; // Change button text
}

async function deleteSeries(id) {
    if (confirm("Are you sure you want to delete this series?")) {
        await fetch(`https://assignment-x3rl.onrender.com/api/series/${id}`, {
            method: 'DELETE'
        });
        loadSeries(); // Reload series after deletion
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
