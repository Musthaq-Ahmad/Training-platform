import { Router } from 'express';
import { profileController } from './profile.controller';

const profileRoutes = Router();

profileRoutes.get('/', profileController.getProfile);

export default profileRoutes;
