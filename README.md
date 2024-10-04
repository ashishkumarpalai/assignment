## **Real Estate Management System (RESTful API) Documentation**

### **Project Overview**
<br>[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/24840024-7534fb0e-cdf9-4c1e-bae5-7b10b4476b1c?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D24840024-7534fb0e-cdf9-4c1e-bae5-7b10b4476b1c%26entityType%3Dcollection%26workspaceId%3D9de6f216-2798-4a99-b5f0-700b40ee712a)

Backend Link
https://assignment-x3rl.onrender.com/ 
<br>
Frontend Link
https://real-estate-project-firebase-firestor.netlify.app/

This Real Estate Management System is a backend API built using **Node.js**, **Express.js**, and **Firebase Firestore** for database management. It is designed to manage data related to **Developers**, **Projects**, **Towers**, and **Series** in a real estate ecosystem. The system provides a well-structured set of CRUD (Create, Read, Update, Delete) operations for each module while ensuring proper validation, error handling, and data consistency across related entities.

The project adheres to the **MVC architecture**, which separates concerns between models, views (though not applicable for this API), and controllers.
```
|-- project-root/
    |-- controllers/
        |-- developerController.js
        |-- projectController.js
        |-- towerController.js
        |-- seriesController.js
    |-- models/
        |-- developerModel.js
        |-- projectModel.js
        |-- towerModel.js
        |-- seriesModel.js
    |-- routes/
        |-- developerRoutes.js
        |-- projectRoutes.js
        |-- towerRoutes.js
        |-- seriesRoutes.js
    |-- config/
        |-- firebase.js
    |-- app.js
    |-- package.json
    |-- serviceAccountKey.json
```

### **Technologies Used**
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for building APIs.
- **Firebase Firestore**: NoSQL cloud database used for storing and managing data.
- **Firebase Admin SDK**: Library to interact with Firestore from Node.js.
- **MVC Architecture**: To organize code into Models, Controllers, and Routes.

---

### **API Modules**
1. **Developer Management**
2. **Project Management**
3. **Tower Management**
4. **Series Management**

---

## **1. Developer Management API**

### **Fields**:
- **Developer Name**: String
- **Email**: String
- **Address**: String
- **Incorporation Date**: Date
- **Total Projects Delivered**: Number
- **Total Sq Ft Delivered**: Number
- **Reason for Choosing Developer**: String
- **Website Link**: String

### **CRUD Operations**:

#### 1. Create Developer
- **Endpoint**: `POST /api/developers`
- **Request Body**:
    ```json
    {
        "developerName": "ABC Developers",
        "email": "contact@abcdevelopers.com",
        "address": "123 Main Street",
        "incorporationDate": "2020-01-01",
        "totalProjectsDelivered": 50,
        "totalSqFtDelivered": 500000,
        "reasonForChoosingDeveloper": "Proven track record",
        "websiteLink": "http://www.abcdevelopers.com"
    }
    ```
- **Response**: Returns the created developer’s details.

#### 2. Get All Developers / Specific Developer
- **Endpoint**:
    - `GET /api/developers` (Retrieve all developers)
    - `GET /api/developers/:id` (Retrieve developer by ID)
- **Response**: List of developers or details of the specific developer.

#### 3. Update Developer
- **Endpoint**: `PUT /api/developers/:id`
- **Request Body**: Similar to the "Create Developer" request.
- **Response**: Updated developer’s details.

#### 4. Delete Developer
- **Endpoint**: `DELETE /api/developers/:id`
- **Response**: Success message or error if developer not found.

#### **Error Handling**:
- If no developers exist, return a message: `"No developers found"`.
- If trying to create a developer with existing email, return an error: `"Developer with the same email already exists."`
- If trying to delete/update a non-existent developer, return an error: `"Developer not found."`

---

## **2. Project Management API**

### **Fields**:
- **Project Details**: String
- **RERA Status**: Boolean
- **Financials**: Object (e.g., `{ "budget": 5000000, "expenditure": 3000000 }`)
- **Media**: Array of URLs for media files

### **CRUD Operations**:

#### 1. Create Project
- **Endpoint**: `POST /api/projects`
- **Request Body**:
    ```json
    {
        "projectDetails": "Luxury Villas",
        "reraStatus": true,
        "financials": {
            "budget": 5000000,
            "expenditure": 3000000
        },
        "media": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
    }
    ```
- **Response**: Returns the created project’s details.

#### 2. Get All Projects / Specific Project
- **Endpoint**:
    - `GET /api/projects` (Retrieve all projects)
    - `GET /api/projects/:id` (Retrieve project by ID)
- **Response**: List of projects or details of the specific project.

#### 3. Update Project
- **Endpoint**: `PUT /api/projects/:id`
- **Request Body**: Similar to the "Create Project" request.
- **Response**: Updated project’s details.

#### 4. Delete Project
- **Endpoint**: `DELETE /api/projects/:id`
- **Response**: Success message or error if project not found.

#### **Error Handling**:
- If no projects exist, return a message: `"No projects found"`.
- If trying to delete/update a non-existent project, return an error: `"Project not found."`

---

## **3. Tower Management API**

### **Fields**:
- **Project ID**: Reference to Project
- **Developer ID**: Reference to Developer
- **Tower Number**: Number
- **Tower Name**: String
- **Tower Phase**: String
- **Phase RERA Number**: String
- **Delivery Timeline**: Date
- **Current Status**: String
- **Duplicate Tower Option**: Boolean
- **Total Floors**: Number
- **Tower Core Details**: Object (e.g., `{ totalApartments, parkingLevels, lobby, terrace }`)

### **CRUD Operations**:

#### 1. Create Tower
- **Endpoint**: `POST /api/towers`
- **Request Body**:
    ```json
    {
        "projectId": "projectId123",
        "developerId": "developerId123",
        "towerNumber": 1,
        "towerName": "A Tower",
        "towerPhase": "Phase 1",
        "phaseReraNumber": "RERA123456",
        "deliveryTimeline": "2024-12-31",
        "currentStatus": "Under Construction",
        "duplicateTowerOption": false,
        "totalFloors": 20,
        "towerCoreDetails": {
            "totalApartments": 100,
            "parkingLevels": 2,
            "lobby": "Luxury",
            "terrace": "Yes"
        }
    }
    ```
- **Response**: Returns the created tower’s details.

#### 2. Get All Towers / Specific Tower
- **Endpoint**:
    - `GET /api/towers` (Retrieve all towers)
    - `GET /api/towers/:id` (Retrieve tower by ID)
- **Response**: List of towers or details of the specific tower, including related `Developer` and `Project` details.

#### 3. Update Tower
- **Endpoint**: `PUT /api/towers/:id`
- **Request Body**: Similar to the "Create Tower" request.
- **Response**: Updated tower’s details.

#### 4. Delete Tower
- **Endpoint**: `DELETE /api/towers/:id`
- **Response**: Success message or error if tower not found.

#### **Error Handling**:
- When creating or updating a tower, check if the `Project ID` and `Developer ID` are valid before proceeding.
- If no towers exist, return a message: `"No towers found"`.
- If trying to delete/update a non-existent tower, return an error: `"Tower not found."`

---

## **4. Series Management API**

### **Fields**:
- **Series Name**: String
- **Tower ID**: Reference to Tower
- **Series Typology**: Dropdown (e.g., BHK)
- **Series Details**: Object (e.g., `{ bed, dimension, bath, direction }`)
- **Add-Ons**: Array of Strings (e.g., `[ "Utility", "Terrace", "Store" ]`)

### **CRUD Operations**:

#### 1. Create Series
- **Endpoint**: `POST /api/series`
- **Request Body**:
    ```json
    {
        "seriesName": "Luxury 3BHK",
        "towerId": "towerId123",
        "seriesTypology": "3BHK",
        "seriesDetails": {
            "bed": 3,
            "dimension": "2000 sq.ft",
            "bath": 2,
            "direction": "East"
        },
        "addOns": ["Utility", "Terrace"]
    }
    ```
- **Response**: Returns the created series’ details.

#### 2. Get All Series / Specific Series
- **Endpoint**:
    - `GET /api/series` (Retrieve all series)
    - `GET /api/series/:id` (Retrieve series by ID)
- **Response**: List of series or details of the specific series.

#### 3. Update Series
- **Endpoint**: `PUT /api/series/:id`
- **Request Body**: Similar to the "Create Series" request.
- **Response**: Updated series’ details.

#### 4. Delete Series
- **Endpoint**: `DELETE /api/series/:id`
- **Response**: Success message or error if series not found.

#### **Error Handling**:
- Validate that the `Tower ID` is valid before creating or updating the series.
- If no series exist, return a message: `"No series found"`.
- If trying to delete/update a non-existent series, return an error: `"Series not found
