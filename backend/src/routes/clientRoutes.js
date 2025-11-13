const { Router } = require('express');

const { authenticateToken } = require('../middleware/authMiddleware');
const clientController = require('../controllers/clientController');

const router = Router();

router.post('/register', clientController.createUser);
router.post('/login', clientController.loginUser);
router.get('/', authenticateToken, clientController.getLoggedUser);
router.delete('/logout', authenticateToken, clientController.logoutUser);

module.exports = router;