import * as Yup from "yup";

const validationSchema = Yup.object({
  temaId: Yup.number()
    .required("Selecione um tema")
    .min(1, "Selecione um tema"),

  enunciado: Yup.string()
    .required("O enunciado é obrigatório")
    .min(10, "O enunciado deve ter pelo menos 10 caracteres")
    .max(500, "O enunciado não pode ter mais de 500 caracteres"),
    
});

export default validationSchema;
