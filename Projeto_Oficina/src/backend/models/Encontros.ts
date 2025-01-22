import { Schema, model } from "mongoose";
import { encontrosProps } from "../types/bdTypes";

const encontrosSchema = new Schema<encontrosProps>({
    data: {
        type: String,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    local: {
        type: String,
        required: true
    },
    grupoID: {
        type: Number,
        required: true
    },
    observacoes: {
        type: String,
        required: true
    },
    tema: {
        type: String,
        required: true
    },
    concluido: {
        type: Boolean,
        required: true
    }
})

const schemaEncontros = model("encontros", encontrosSchema)

export default schemaEncontros