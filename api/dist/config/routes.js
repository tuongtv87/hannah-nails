"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const staffRoutes_1 = __importDefault(require("../routes/staffRoutes"));
const customerRoutes_1 = __importDefault(require("../routes/customerRoutes"));
const serviceRoutes_1 = __importDefault(require("../routes/serviceRoutes"));
const scheduleRoutes_1 = __importDefault(require("../routes/scheduleRoutes"));
const router = (0, express_1.Router)();
// Sử dụng các routes đã định nghĩa riêng biệt
router.use('/staffs', staffRoutes_1.default);
router.use('/customers', customerRoutes_1.default);
router.use('/services', serviceRoutes_1.default);
router.use('/schedules', scheduleRoutes_1.default);
exports.default = router;
