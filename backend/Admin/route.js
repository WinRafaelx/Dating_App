import express from 'express';
import { getManyUserAuth, getUserAuth, createUserAuth, updateUserAuth, deleteUserAuth, deleteManyUserAuth } from './controllers/UserAuthController.js'
import { getPreferences, getPreference, createPreference, updatePreference, deletePreference } from './controllers/PreferenceController.js';
import { getManyUserInfo, getUserInfo, createUserInfo, updateUserInfo, deleteUserInfo, deleteManyUserInfo } from './controllers/UserInfoController.js';

const router = express.Router();

router.get('/userAuth', getManyUserAuth);
router.get('/userAuth/:id', getUserAuth);
router.post('/userAuth', createUserAuth);
router.put('/userAuth/:id', updateUserAuth);
router.delete('/userAuth/:id', deleteUserAuth);
router.delete('/userAuthMany', deleteManyUserAuth); // Custom route for deleting many

router.get('/preferences', getPreferences);
router.get('/preferences/:id', getPreference);
router.post('/preferences', createPreference);
router.put('/preferences/:id', updatePreference);
router.delete('/preferences/:id', deletePreference);

export default router;
