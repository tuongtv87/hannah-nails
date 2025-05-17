"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scheduleRoutes_1 = __importDefault(require("./scheduleRoutes"));
// Import các routes khác khi sẵn sàng
const staffRoutes_1 = __importDefault(require("./staffRoutes"));
const customerRoutes_1 = __importDefault(require("./customerRoutes"));
const serviceRoutes_1 = __importDefault(require("./serviceRoutes"));
const router = (0, express_1.Router)();
// Cài đặt các routes
router.use('/schedules', scheduleRoutes_1.default);
router.use('/staffs', staffRoutes_1.default);
router.use('/customers', customerRoutes_1.default);
router.use('/services', serviceRoutes_1.default);
exports.default = router;
