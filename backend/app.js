const express = require('express');
const bodyParser = require('body-parser');
const developerRoutes = require('./routes/developerRoutes');
const projectRoutes = require('./routes/projectRoutes');
const towerRoutes = require('./routes/towerRoutes');
const seriesRoutes = require('./routes/seriesRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require("cors")

const app = express();
app.use(bodyParser.json());

app.use(cors())

app.use('/api/developers', developerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/towers', towerRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Error handling for undefined routes
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});









// const express = require('express');
// const bodyParser = require('body-parser');

// // Routes
// const developerRoutes = require('./routes/developerRoutes');
// // const projectRoutes = require('./routes/projectRoutes');
// // const towerRoutes = require('./routes/towerRoutes');
// // const seriesRoutes = require('./routes/seriesRoutes');

// const app = express();
// app.use(bodyParser.json());

// // Use the routes
// app.use('/api/developers', developerRoutes);
// // app.use('/api/projects', projectRoutes);
// // app.use('/api/towers', towerRoutes);
// // app.use('/api/series', seriesRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



































// const express = require('express');
// const admin = require('firebase-admin');
// const bodyParser = require('body-parser');

// // Firebase Admin Setup
// const serviceAccount = require('./serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const db = admin.firestore();

// const app = express();
// app.use(bodyParser.json());


// // API Routes just console
// app.get('/', async (req, res) => {
//   // console.log(req.body);
//   res.send('OK');
// });


// // Developer API Routes
// app.post('/api/developers', async (req, res) => {
//   try {
//     const newDeveloper = req.body;
//     const docRef = await db.collection('developers').add(newDeveloper);
//     res.status(201).json({ id: docRef.id });
//   } catch (error) {
//     res.status(500).send('Error creating developer: ' + error.message);
//   }
// });

// app.get('/api/developers', async (req, res) => {
//   try {
//     const developersSnapshot = await db.collection('developers').get();
//     const developers = developersSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     res.status(200).json(developers);
//   } catch (error) {
//     res.status(500).send('Error retrieving developers: ' + error.message);
//   }
// });

// app.get('/api/developers/:id', async (req, res) => {
//   try {
//     const developerDoc = await db.collection('developers').doc(req.params.id).get();
//     if (!developerDoc.exists) {
//       return res.status(404).send('Developer not found');
//     }
//     res.status(200).json(developerDoc.data());
//   } catch (error) {
//     res.status(500).send('Error retrieving developer: ' + error.message);
//   }
// });

// app.put('/api/developers/:id', async (req, res) => {
//   try {
//     const updatedDeveloper = req.body;
//     await db.collection('developers').doc(req.params.id).update(updatedDeveloper);
//     res.status(200).send('Developer updated successfully');
//   } catch (error) {
//     res.status(500).send('Error updating developer: ' + error.message);
//   }
// });

// app.delete('/api/developers/:id', async (req, res) => {
//   try {
//     await db.collection('developers').doc(req.params.id).delete();
//     res.status(200).send('Developer deleted successfully');
//   } catch (error) {
//     res.status(500).send('Error deleting developer: ' + error.message);
//   }
// });

// // Project API Routes
// app.post('/api/projects', async (req, res) => {
//   try {
//     const newProject = req.body;
//     const docRef = await db.collection('projects').add(newProject);
//     res.status(201).json({ id: docRef.id });
//   } catch (error) {
//     res.status(500).send('Error creating project: ' + error.message);
//   }
// });

// app.get('/api/projects', async (req, res) => {
//   try {
//     const projectsSnapshot = await db.collection('projects').get();
//     const projects = projectsSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     res.status(200).json(projects);
//   } catch (error) {
//     res.status(500).send('Error retrieving projects: ' + error.message);
//   }
// });

// app.get('/api/projects/:id', async (req, res) => {
//   try {
//     const projectDoc = await db.collection('projects').doc(req.params.id).get();
//     if (!projectDoc.exists) {
//       return res.status(404).send('Project not found');
//     }
//     res.status(200).json(projectDoc.data());
//   } catch (error) {
//     res.status(500).send('Error retrieving project: ' + error.message);
//   }
// });

// app.put('/api/projects/:id', async (req, res) => {
//   try {
//     const updatedProject = req.body;
//     await db.collection('projects').doc(req.params.id).update(updatedProject);
//     res.status(200).send('Project updated successfully');
//   } catch (error) {
//     res.status(500).send('Error updating project: ' + error.message);
//   }
// });

// app.delete('/api/projects/:id', async (req, res) => {
//   try {
//     await db.collection('projects').doc(req.params.id).delete();
//     res.status(200).send('Project deleted successfully');
//   } catch (error) {
//     res.status(500).send('Error deleting project: ' + error.message);
//   }
// });

// // Tower API Routes
// app.post('/api/towers', async (req, res) => {
//   try {
//     const newTower = req.body;
//     const docRef = await db.collection('towers').add(newTower);
//     res.status(201).json({ id: docRef.id });
//   } catch (error) {
//     res.status(500).send('Error creating tower: ' + error.message);
//   }
// });

// app.get('/api/towers', async (req, res) => {
//   try {
//     const towersSnapshot = await db.collection('towers').get();
//     const towers = towersSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     res.status(200).json(towers);
//   } catch (error) {
//     res.status(500).send('Error retrieving towers: ' + error.message);
//   }
// });

// app.get('/api/towers/:id', async (req, res) => {
//   try {
//     const towerDoc = await db.collection('towers').doc(req.params.id).get();
//     if (!towerDoc.exists) {
//       return res.status(404).send('Tower not found');
//     }
//     res.status(200).json(towerDoc.data());
//   } catch (error) {
//     res.status(500).send('Error retrieving tower: ' + error.message);
//   }
// });

// app.put('/api/towers/:id', async (req, res) => {
//   try {
//     const updatedTower = req.body;
//     await db.collection('towers').doc(req.params.id).update(updatedTower);
//     res.status(200).send('Tower updated successfully');
//   } catch (error) {
//     res.status(500).send('Error updating tower: ' + error.message);
//   }
// });

// app.delete('/api/towers/:id', async (req, res) => {
//   try {
//     await db.collection('towers').doc(req.params.id).delete();
//     res.status(200).send('Tower deleted successfully');
//   } catch (error) {
//     res.status(500).send('Error deleting tower: ' + error.message);
//   }
// });

// // Series API Routes
// app.post('/api/series', async (req, res) => {
//   try {
//     const newSeries = req.body;
//     const docRef = await db.collection('series').add(newSeries);
//     res.status(201).json({ id: docRef.id });
//   } catch (error) {
//     res.status(500).send('Error creating series: ' + error.message);
//   }
// });

// app.get('/api/series', async (req, res) => {
//   try {
//     const seriesSnapshot = await db.collection('series').get();
//     const series = seriesSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     res.status(200).json(series);
//   } catch (error) {
//     res.status(500).send('Error retrieving series: ' + error.message);
//   }
// });

// app.get('/api/series/:id', async (req, res) => {
//   try {
//     const seriesDoc = await db.collection('series').doc(req.params.id).get();
//     if (!seriesDoc.exists) {
//       return res.status(404).send('Series not found');
//     }
//     res.status(200).json(seriesDoc.data());
//   } catch (error) {
//     res.status(500).send('Error retrieving series: ' + error.message);
//   }
// });

// app.put('/api/series/:id', async (req, res) => {
//   try {
//     const updatedSeries = req.body;
//     await db.collection('series').doc(req.params.id).update(updatedSeries);
//     res.status(200).send('Series updated successfully');
//   } catch (error) {
//     res.status(500).send('Error updating series: ' + error.message);
//   }
// });

// app.delete('/api/series/:id', async (req, res) => {
//   try {
//     await db.collection('series').doc(req.params.id).delete();
//     res.status(200).send('Series deleted successfully');
//   } catch (error) {
//     res.status(500).send('Error deleting series: ' + error.message);
//   }
// });

// // Start Server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
