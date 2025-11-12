const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../database');

const createUser = async (req, res) => {
    const { name, email, password} = req.body;
    try {
        const emailCheck = await db.query(
            'SELECT id FROM client WHERE email = $1',
            [email]
        );
        if (emailCheck.rows.length > 0) {
            return res.status(409).json({ error: 'Email já em uso' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query(
            'INSERT INTO client (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hashedPassword]
        );
        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db.query(
            'SELECT id, password FROM client WHERE email = $1',
            [email]
        );
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const isMatch = await bcrypt.compare(password, result.rows[0].password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

module.exports = {
    createUser,
    loginUser
};