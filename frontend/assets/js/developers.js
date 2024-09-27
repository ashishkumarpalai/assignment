
const form = document.getElementById('developerForm');
let currentEditId = null;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        developerName: document.getElementById('developerName').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        incorporationDate: document.getElementById('incorporationDate').value,
        totalProjectsDelivered: document.getElementById('totalProjectsDelivered').value,
        totalSqFtDelivered: document.getElementById('totalSqFtDelivered').value,
        reasonForChoosingDeveloper: document.getElementById('reasonForChoosingDeveloper').value,
        websiteLink: document.getElementById('websiteLink').value
    };

    if (currentEditId) {
        // Update existing developer
        const response = await putData(`http://localhost:3000/api/developers/${currentEditId}`, data);
        console.log(response);
        currentEditId = null; // Reset edit ID
    } else {
        // Add new developer
        const response = await postData('http://localhost:3000/api/developers', data);
        console.log(response);
    }

    loadDevelopers(); // Reload developer list after submission
    form.reset(); // Reset the form fields
});

async function loadDevelopers() {
    const developers = await fetchData('http://localhost:3000/api/developers');
    const tableBody = document.getElementById('developersTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear previous rows

    developers.forEach(developer => {
        const row = `<tr>
                    <td>${developer.developerName}</td>
                    <td>${developer.email}</td>
                    <td>${developer.address}</td>
                    <td>${developer.incorporationDate}</td>
                    <td>${developer.totalProjectsDelivered}</td>
                    <td>${developer.totalSqFtDelivered}</td>
                    <td>${developer.reasonForChoosingDeveloper}</td>
                    <td><a href="${developer.websiteLink}" target="_blank">Website</a></td>
                    <td>
                        <button onclick="editDeveloper('${developer.id}')">Edit</button>
                        <button onclick="deleteDeveloper('${developer.id}')">Delete</button>
                    </td>
                </tr>`;
        tableBody.innerHTML += row;
    });
}

async function editDeveloper(id) {
    const developer = await fetchData(`http://localhost:3000/api/developers/${id}`);
    document.getElementById('developerName').value = developer.developerName;
    document.getElementById('email').value = developer.email;
    document.getElementById('address').value = developer.address;
    document.getElementById('incorporationDate').value = developer.incorporationDate;
    document.getElementById('totalProjectsDelivered').value = developer.totalProjectsDelivered;
    document.getElementById('totalSqFtDelivered').value = developer.totalSqFtDelivered;
    document.getElementById('reasonForChoosingDeveloper').value = developer.reasonForChoosingDeveloper;
    document.getElementById('websiteLink').value = developer.websiteLink;

    // Set the current edit ID
    currentEditId = id;
}

async function deleteDeveloper(id) {
    await deleteData(`http://localhost:3000/api/developers/${id}`);
    loadDevelopers(); // Refresh list after deletion
}

async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

async function putData(url, data) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

async function deleteData(url) {
    const response = await fetch(url, {
        method: 'DELETE'
    });
    return response.json();
}

loadDevelopers(); // Load developers on page load










// document.addEventListener("DOMContentLoaded", () => {
//     const developerForm = document.getElementById("developerForm");
//     const developerTableBody = document.getElementById("developerTableBody");

//     // Fetch developers on load
//     fetchDevelopers();

//     // Submit form to create new developer
//     developerForm.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         const formData = new FormData(developerForm);
//         const developerData = Object.fromEntries(formData.entries());

//         const response = await fetch("/api/developers", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(developerData),
//         });

//         if (response.ok) {
//             alert("Developer added successfully");
//             fetchDevelopers();
//             developerForm.reset();
//         } else {
//             alert("Error adding developer");
//         }
//     });

//     // Fetch all developers and render in the table
//     async function fetchDevelopers() {
//         const response = await fetch("/api/developers");
//         const developers = await response.json();
//         renderDevelopers(developers);
//     }

//     // Render developers in the table
//     function renderDevelopers(developers) {
//         developerTableBody.innerHTML = "";
//         developers.forEach((developer) => {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//                 <td>${developer.developerName}</td>
//                 <td>${developer.email}</td>
//                 <td>${developer.address}</td>
//                 <td>${developer.incorporationDate}</td>
//                 <td>${developer.totalProjectsDelivered}</td>
//                 <td>${developer.totalSqFtDelivered}</td>
//                 <td>${developer.reasonForChoosingDeveloper}</td>
//                 <td><a href="${developer.websiteLink}">Website</a></td>
//                 <td>
//                     <button onclick="editDeveloper('${developer.id}')">Edit</button>
//                     <button onclick="deleteDeveloper('${developer.id}')">Delete</button>
//                 </td>
//             `;
//             developerTableBody.appendChild(row);
//         });
//     }

//     // Add functions for editing and deleting developers here
// });
