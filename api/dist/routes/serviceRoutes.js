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
const serviceController = __importStar(require("../controllers/serviceController"));
const router = (0, express_1.Router)();
// Lấy danh sách dịch vụ
router.get('/', serviceController.getServices);
// Lấy chi tiết dịch vụ theo ID
router.get('/:id', serviceController.getServiceById);
// Tạo dịch vụ mới
router.post('/', serviceController.createService);
// Cập nhật thông tin dịch vụ
router.put('/:id', serviceController.updateService);
// Xóa dịch vụ
router.delete('/:id', serviceController.deleteService);
// Cập nhật trạng thái dịch vụ
router.patch('/:id/status', serviceController.updateServiceStatus);
// Tìm kiếm dịch vụ
router.get('/search', serviceController.searchServices);
exports.default = router;
