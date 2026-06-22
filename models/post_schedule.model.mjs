import mongoose from "mongoose";

const postScheduleSchema =
    new mongoose.Schema(
        {
            scheduledAt: {
                type: Date,
                required: true,
                index: true,
            },

            status: {
                type: String,
                enum: [
                    "PENDING",
                    "PROCESSING",
                    "SUCCESS",
                ],
                default: "PENDING",
                index: true,
            },

            retryCount: {
                type: Number,
                default: 0,
            },

            lastError: String,

            completedAt: Date,
        },
        {
            timestamps: true,
        }


    );

export default mongoose.model(
    "PostSchedule",
    postScheduleSchema
);
