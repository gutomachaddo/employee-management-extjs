import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import funcionariosRoutes from './routes/funcionarios.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/funcionarios', funcionariosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
