const db = require("../database");
const bcrypt = require("bcrypt");

const { generateId } = require("../utils");

async function create(req, res) {
    const { name, email, password, birthdate } = req.body;

    let response;

    try {
        response = await db.query("SELECT FROM clients WHERE email=$1", [email]);

        if(response.rowCount > 0)
        {
            return res.status(409).json({
                success: response
            });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASH_SALT));

        let id = 0;
        while(true)
        {
            id = generateId();
            response = await db.query("SELECT FROM clients WHERE id=$1", [id]);
            if(response.rowCount === 0)
                break;    
        }

        await db.query("INSERT INTO clients VALUES ($1, $2, $3, $4, $5)", [id, name, email, hashedPassword, birthdate]);

        return res.status(201).json({
            success: {
                id,
                name,
                email
            }
        });

    } catch (error) {
        console.log(error);
        
        return res.status(500).json(error);
    }
}

async function get(req, res) {
    const response = await db.query("SELECT * FROM clients");

    res.json(response);
}

module.exports = {
    create,
    get
}