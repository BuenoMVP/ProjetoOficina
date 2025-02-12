import { Schema, model } from "mongoose";
import { statusProps } from "../types/bdTypes";

const statusSchema = new Schema<statusProps>({
    status: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    }
})

const schemaStatus = model("status", statusSchema)

export default schemaStatus