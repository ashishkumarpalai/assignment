
let editingProjectId = null; // To keep track of the project being edited

const projectForm = document.getElementById('projectForm');

projectForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mediaLinks = document.getElementById('mediaLinks').value.split(',');
    const data = {
        projectDetails: document.getElementById('projectDetails').value,
        financials: {
            expenditure: parseFloat(document.getElementById('expenditure').value),
            budget: parseFloat(document.getElementById('budget').value)
        },
        developerId: document.getElementById('developerId').value,
        media: mediaLinks.map(link => link.trim()),
        reraStatus: document.getElementById('reraStatus').checked
    };

    if (editingProjectId) {
        // Update existing project
        await putData(`https://assignment-x3rl.onrender.com/api/projects/${editingProjectId}`, data);
        editingProjectId = null; // Reset editing ID
    } else {
        // Create new project
        await postData('https://assignment-x3rl.onrender.com/api/projects', data);
    }
    loadProjects(); // Reload projects after submission
    projectForm.reset(); // Reset the form fields
});

async function loadProjects() {
    const projects = await fetchData('https://assignment-x3rl.onrender.com/api/projects');
    const tableBody = document.getElementById('projectsTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear previous rows

    projects.forEach(project => {
        const mediaLinks = project.media.join(', ');
        const row = `<tr>
                    <td>${project.projectDetails}</td>
                    <td>${project.financials.expenditure}</td>
                    <td>${project.financials.budget}</td>
                    <td>${project.developerId}</td>
                    <td>${project.reraStatus ? 'Yes' : 'No'}</td>
                    <td>${mediaLinks}</td>
                    <td>
                        <button onclick="editProject('${project.id}')">Edit</button>
                        <button onclick="deleteProject('${project.id}')">Delete</button>
                    </td>
                </tr>`;
        tableBody.innerHTML += row;
    });
}
loadProjects()
async function editProject(id) {
    const project = await fetchData(`https://assignment-x3rl.onrender.com/api/projects/${id}`);
    document.getElementById('projectDetails').value = project.projectDetails;
    document.getElementById('expenditure').value = project.financials.expenditure;
    document.getElementById('budget').value = project.financials.budget;
    document.getElementById('developerId').value = project.developerId;
    document.getElementById('mediaLinks').value = project.media.join(', ');
    document.getElementById('reraStatus').checked = project.reraStatus;

    editingProjectId = id; // Set the ID of the project being edited
    projectForm.querySelector('button[type="submit"]').innerText = "Update Project"; // Change button text
}

async function deleteProject(id) {
    await deleteData(`https://assignment-x3rl.onrender.com/api/projects/${id}`);
    loadProjects(); // Refresh list after deletion
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

loadProjects(); // Load projects on page load
