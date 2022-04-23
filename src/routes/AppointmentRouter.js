import { Router } from 'express';
import AppointmentController from '../controller/AppointmentController.js';

const appointmentController = new AppointmentController();
const router = Router();

router.get('/appointment', appointmentController.index.bind(appointmentController));
router.get('/appointment/:id', appointmentController.getOne.bind(appointmentController));
router.put('/appointment/:id', appointmentController.update.bind(appointmentController));
router.post('/appointment', appointmentController.store.bind(appointmentController));
router.delete('/appointment/:id', appointmentController.remove.bind(appointmentController));

export default router;
