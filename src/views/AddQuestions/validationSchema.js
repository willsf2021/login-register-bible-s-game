import * as Yup from "yup";

const validationSchema = Yup.object({
  temaId: Yup.number()
    .required("Selecione um tema")
    .min(1, "Selecione um tema"),

  enunciado: Yup.string()
    .required("O enunciado é obrigatório")
    .min(10, "O enunciado deve ter pelo menos 10 caracteres")
    .max(500, "O enunciado não pode ter mais de 500 caracteres"),
    
    referencia: Yup.string().when(["referenciaBiblica", "tipoResposta"], {
      is: (referenciaBiblica) => referenciaBiblica === true,
      then: (schema) =>
        Yup.string()
          .test("validacao-referencia", "Selecione a referência completa", (value, ctx) => {
            if (!value) return false; // Impede valores vazios
            
            const { tipoResposta } = ctx.parent;
    
            // "Livro Capítulo" (ex: Gn 1, Sl 150)
            const regexRLC = /^[A-Za-zÀ-ÿ0-9]{1,3}\s\d{1,3}$/;
    
            // "Livro Capítulo:Verso" (ex: Gn 1:2, Sl 2:149)
            const regexOutro = /^[A-Za-zÀ-ÿ0-9]{1,3}\s\d{1,3}:\d{1,3}$/;
    
            // Se for tipo "RLC", validar como Livro Capítulo, senão validar como Livro Capítulo:Verso
            return tipoResposta === "RLC" ? regexRLC.test(value) : regexOutro.test(value);
          })
          .required("A referência é obrigatória"), // Mantém a mensagem de erro apenas se estiver vazio
    
      otherwise: (schema) =>
        schema
          .required("A referência é obrigatória")
          .min(10, "A referência deve ter pelo menos 10 caracteres")
          .max(1000, "A referência não pode ter mais de 1000 caracteres"),
    }),
    
    
    

});

export default validationSchema;
