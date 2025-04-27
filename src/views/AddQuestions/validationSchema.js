import * as Yup from "yup";

const getBiblicalError = (value, tipoResposta) => {
  const [livro, resto] = value ? value.split(" ") : [null, null];
  const [capitulo, versiculo] = resto ? resto.split(":") : [null, null];
  
  if (!livro) return "Selecione o livro";
  if (!capitulo) return "Selecione o capítulo";
  if (tipoResposta !== "RLC" && !versiculo) return "Selecione o versículo";
  return "Referência bíblica incompleta";
};

const validationSchema = Yup.object({
  temaId: Yup.number()
    .required("Selecione um tema")
    .min(1, "Selecione um tema"),

  enunciado: Yup.string()
    .required("O enunciado é obrigatório")
    .min(10, "O enunciado deve ter pelo menos 10 caracteres")
    .max(500, "O enunciado não pode ter mais de 500 caracteres"),

  referencia: Yup.string()
    .when(["referenciaBiblica", "tipoResposta"], (refBiblica, tipoResposta, schema) => {
      if (refBiblica) {
        return schema
          .required("Referência bíblica é obrigatória")
          .test('biblica-completa', function(value) {
            if (!value) return this.createError({ message: "Preencha a referência bíblica" });
            
            const errorMessage = getBiblicalError(value, tipoResposta);
            const isValid = !errorMessage.startsWith("Selecione");
            
            return isValid || this.createError({ message: errorMessage });
          });
      }
      return schema
        .required("Referência textual é obrigatória")
        .min(10, "A referência textual deve ter pelo menos 10 caracteres")
        .max(1000, "A referência textual não pode exceder 1000 caracteres");
    }),
});

export default validationSchema;