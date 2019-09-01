import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import RegisterController from './app/controllers/RegisterController';

import AuthMiddleware from './app/middlewares/auth';

const routes = express.Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(AuthMiddleware);

routes.put('/users', UserController.update);
routes.post('/files', upload.single('banner'), FileController.store);
routes.post('/meetups', MeetupController.store);
routes.get('/meetups', MeetupController.index);
routes.get('/meetups/:id', MeetupController.show);
routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

routes.get('/registers', RegisterController.index);
routes.post('/registers/:id', RegisterController.store);
routes.delete('/registers/:id', RegisterController.destroy);

export default routes;
