import express from 'express';
import dotenv from 'dotenv';
import userRoutes from '../NODE/src/routes/userRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/allUsers', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});