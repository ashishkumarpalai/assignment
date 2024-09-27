// Developer form submission handler
document.getElementById('developerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const developerName = document.getElementById('developerName').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const incorporationDate = document.getElementById('incorporationDate').value;

    // Make API call to create developer
    fetch('http://localhost:3000/api/developers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            developerName,
            email,
            address,
            incorporationDate
        })
    })
        .then(response => response.json())
        .then(data => {
            alert('Developer created successfully!');
            // Update the list of developers
            loadDevelopers();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to create developer');
        });
});

// Function to load developers
function loadDevelopers() {
    const developerData = [
        {
            "id": "LHHkDmbjdmqIZFvlLgjl",
            "totalSqFtDelivered": 50000,
            "reasonForChoosingDeveloper": "Well-established firm",
            "address": "123 Developer St",
            "websiteLink": "https://abcdevelopers.com",
            "totalProjectsDelivered": 10,
            "incorporationDate": "2020-01-01",
            "developerName": "ABC Developers",
            "email": "abc@developers.com"
        },
        {
            "id": "OlC1HMMmxRXDRq8VcEHR",
            "reasonForChoosingDeveloper": "Well-established firm",
            "address": "123 Developer St",
            "websiteLink": "https://abcdevelopers.com",
            "totalProjectsDelivered": 10,
            "incorporationDate": "2020-01-01",
            "developerName": "ABC Developers",
            "totalSqFtDelivered": 40000,
            "email": "abcddss@developers.com"
        }
    ];

    const developerList = document.getElementById('developerList');
    developerList.innerHTML = '';

    developerData.forEach(developer => {
        const developerCard = document.createElement('div');
        developerCard.classList.add('developer-card');

        developerCard.innerHTML = `
            <h3>${developer.developerName}</h3>
            <p>Email: <a href="mailto:${developer.email}">${developer.email}</a></p>
            <p>Address: ${developer.address}</p>
            <p>Website: <a href="${developer.websiteLink}" target="_blank">${developer.websiteLink}</a></p>
            <p>Total SqFt Delivered: ${developer.totalSqFtDelivered}</p>
            <p>Total Projects Delivered: ${developer.totalProjectsDelivered}</p>
            <p>Reason for Choosing: ${developer.reasonForChoosingDeveloper}</p>
            <p>Incorporation Date: ${new Date(developer.incorporationDate).toLocaleDateString()}</p>
        `;

        developerList.appendChild(developerCard);
    });
}

// Call the function to load developers when the page is loaded
window.onload = loadDevelopers;


// Load developers when the page is loaded

