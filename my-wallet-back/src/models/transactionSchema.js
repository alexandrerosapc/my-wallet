import joi from "joi";

export const transactionSchema = joi.object({
    data: joi.string().required(),
    valor: joi.number().required(),
    descricao: joi.string().required()
})