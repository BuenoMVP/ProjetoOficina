import { Schema, model } from "mongoose";
import { gruposProps } from "../types/bdTypes";

const gruposSchema = new Schema<gruposProps>({
    nome: {
        type: String,
        required: true
    },
    senioridade: {
        type: String,
        required: true
    },
    integrantes: [{
        type: Schema.Types.ObjectId,
        ref: "integrantes",
        require: false
    }]
})

const schemaGrupos = model("grupos", gruposSchema)

export default schemaGrupos
