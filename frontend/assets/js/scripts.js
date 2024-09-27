// Basic helper functions to interact with the backend API

// Fetch data from the server
async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

// Submit data to the server
async function postData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Error posting data:", error);
        return null;
    }
}

// Update data on the server
async function updateData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating data:", error);
        return null;
    }
}

// Delete data on the server
async function deleteData(url) {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting data:", error);
        return null;
    }
}
