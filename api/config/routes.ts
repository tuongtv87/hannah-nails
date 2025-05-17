import { Router } from 'express';
import staffRoutes from '../routes/staffRoutes';
import customerRoutes from '../routes/customerRoutes';
import serviceRoutes from '../routes/serviceRoutes';
import scheduleRoutes from '../routes/scheduleRoutes';

const router = Router();

// Sử dụng các routes đã định nghĩa riêng biệt
router.use('/staffs', staffRoutes);
router.use('/customers', customerRoutes);
router.use('/services', serviceRoutes);
router.use('/schedules', scheduleRoutes);

export default router; 