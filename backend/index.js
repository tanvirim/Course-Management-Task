const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const mongodb = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

mongodb();

app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

app.use(errorHandler);

const port = 8080 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
