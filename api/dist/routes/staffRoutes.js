"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const staffController = __importStar(require("../controllers/staffController"));
const router = (0, express_1.Router)();
// Lấy danh sách nhân viên
router.get('/', staffController.getStaffs);
// Lấy chi tiết nhân viên theo ID
router.get('/:id', staffController.getStaffById);
// Tạo nhân viên mới
router.post('/', staffController.createStaff);
// Cập nhật thông tin nhân viên
router.put('/:id', staffController.updateStaff);
// Xóa nhân viên
router.delete('/:id', staffController.deleteStaff);
// Cập nhật trạng thái nhân viên
router.patch('/:id/status', staffController.updateStaffStatus);
// Lấy giờ làm việc của nhân viên
router.get('/:id/working-hours', staffController.getStaffWorkingHours);
// Cập nhật giờ làm việc của nhân viên
router.put('/:id/working-hours', staffController.updateStaffWorkingHours);
// Lấy danh sách nhân viên có sẵn
router.get('/available', staffController.getAvailableStaffs);
exports.default = router;
