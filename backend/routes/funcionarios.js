import express from 'express';
import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;
const router = express.Router();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Employee not found.' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body);

        const count = await pool.query('SELECT COUNT(*) FROM employees');
        if (parseInt(count.rows[0].count) >= 50) {
            return res.status(429).json({ error: 'Max Limit reached (50).' });
        }

        const { name, email, position, department, wage, admission_date, status } = req.body;

        const result = await pool.query(
            'INSERT INTO employees (name, email, position, department, wage, admission_date, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, email, position, department, wage, admission_date, status ? status.toLowerCase() : 'ativo']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.log('Erro:', err);
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { nome, email, cargo, departamento, salario, data_admissao, status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE employees SET nome=$1, email=$2, cargo=$3, departamento=$4, salario=$5, data_admissao=$6, status=$7 WHERE id=$8 RETURNING *',
            [nome, email, cargo, departamento, salario, data_admissao, status, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Employee not found.' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM employees WHERE id=$1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Employee not found.' });
        res.json({ message: 'Employee successfully removed!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
