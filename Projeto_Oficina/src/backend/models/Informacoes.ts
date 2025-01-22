import { Schema, model } from "mongoose";
import { informacoesProps } from "../types/bdTypes";

const informacoesSchema = new Schema<informacoesProps>({
    titulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    }
})

const schemaInformacoes = model("informacoes", informacoesSchema)

export default schemaInformacoes