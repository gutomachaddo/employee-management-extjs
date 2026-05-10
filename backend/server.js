import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import rateLimit from 'express-rate-limit';
import employeesRoute from './routes/funcionarios.js';

const app = express();

// Protection: max 100 request for each IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {error: 'So many request. Try again later.'}
})

app.use(cors());
app.use(express.json());
app.use(limiter);

app.use('/api/employees', employeesRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running the server on port: ${PORT}`);
});
