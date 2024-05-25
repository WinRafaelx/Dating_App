import express from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser, getMany, deleteMany } from './controllers/UserAuthController.js';
import { getPreferences, getPreference, createPreference, updatePreference, deletePreference } from './controllers/preferenceController.js';

const router = express.Router();

router.get('/userAuth', getUsers);
router.get('/userAuth/:id', getUser);
router.post('/userAuth', createUser);
router.put('/userAuth/:id', updateUser);
router.delete('/userAuth/:id', deleteUser);
router.get('/userAuthMany', getMany); // Custom route for getting many
router.delete('/userAuthMany', deleteMany); // Custom route for deleting many

router.get('/preferences', getPreferences);
router.get('/preferences/:id', getPreference);
router.post('/preferences', createPreference);
router.put('/preferences/:id', updatePreference);
router.delete('/preferences/:id', deletePreference);

export default router;
