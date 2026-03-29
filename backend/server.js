require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load('./docs/openapi.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/exercises', require('./routes/exercises'));
app.use('/api/workouts', require('./routes/workouts'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/routines', require('./routes/routines'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
