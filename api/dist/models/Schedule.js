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
const mongoose_1 = __importStar(require("mongoose"));
// Schema cho Schedule
const scheduleSchema = new mongoose_1.Schema({
    customerId: {
        type: String,
        ref: 'Customer',
        required: true
    },
    staffId: {
        type: String,
        ref: 'Staff',
        required: true
    },
    serviceId: {
        type: String,
        ref: 'Service',
        required: true
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Working', 'Completed', 'Canceled'],
        default: 'Pending',
        required: true
    },
    notes: { type: String },
    createdAt: { type: String, default: () => new Date().toISOString() },
    updatedAt: { type: String, default: () => new Date().toISOString() }
}, {
    timestamps: true, // Tự động thêm createdAt và updatedAt
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});
// Tạo index cho hiệu suất truy vấn
scheduleSchema.index({ staffId: 1, startTime: 1, endTime: 1 });
scheduleSchema.index({ customerId: 1 });
scheduleSchema.index({ startTime: 1, endTime: 1 });
scheduleSchema.index({ status: 1 });
// Method kiểm tra trùng lịch
scheduleSchema.statics.checkTimeConflict = async function (staffId, startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const conflictCount = await this.countDocuments({
        staffId,
        status: { $nin: ['Canceled'] },
        $or: [
            { startTime: { $lt: end, $gte: start } },
            { endTime: { $gt: start, $lte: end } },
            { $and: [{ startTime: { $lte: start } }, { endTime: { $gte: end } }] }
        ]
    });
    return conflictCount > 0;
};
// Tạo model
const ScheduleModel = mongoose_1.default.model('Schedule', scheduleSchema);
exports.default = ScheduleModel;
