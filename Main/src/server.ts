import express from 'express';
// import routes from './routes/api';
import routes from './routes/index.js';
import db from './config/connection.js';

// connectDB();

await db();

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(routes);

// db.once('open', () => {
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
// });

// function connectDB() {
//   throw new Error('Function not implemented.');
// }