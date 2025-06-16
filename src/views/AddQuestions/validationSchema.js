import * as yup from "yup";

const validationSchema = yup.object().shape({
  temaId: yup
    .number()
    .min(1, "Selecione um tema!")
    .required("Campo obrigatório"),

  enunciado: yup
    .string()
    .min(15, "Mínimo de 15 caracteres!")
    .required("Campo obrigatório"),

  tipoResposta: yup
    .string()
    .oneOf(["MES", "RCO", "RLC", "RES"])
    .required("Selecione um tipo!"),

  referenciaBiblica: yup
    .string()
    .oneOf(["true", "false"])
    .required("Selecione um tipo de referência!")
    .test(
      "tipo-referencia",
      "Tipo de referência é obrigatório!",
      function (value) {
        const tipoResposta = this.parent.tipoResposta;
        if (tipoResposta === "RCO" || tipoResposta === "RLC") {
          return value === "true";
        }

        return true;
      }
    ),

  referencia: yup
    .string()
    .required("Referência obrigatória")
    .test("valida-referencia", function (value) {
      const { tipoResposta, referenciaBiblica } = this.parent;

      if (referenciaBiblica === "true") {
        if (tipoResposta === "RLC") {
          const rlcPattern = /^[A-Za-z0-9]+\s\d+$/;
          if (!rlcPattern.test(value || "")) {
            return this.createError({
              message: "Selecione um Livro e um Capítulo",
            });
          }
        } else {
          const rcoPattern = /^[A-Za-z0-9]+\s\d+:\d+$/;
          if (!rcoPattern.test(value || "")) {
            return this.createError({
              message: "Selecione um Livro, um Capítulo e um Versículo",
            });
          }
        }
      } else {
        if (
          typeof value !== "string" ||
          value.length < 10 ||
          !/[a-zA-Z]/.test(value)
        ) {
          return this.createError({
            message: "Mínimo de 10 caracteres.",
          });
        }
      }

      return true;
    }),

  alternativas: yup.array().when("tipoResposta", (tipoResposta, schema) => {
    if (tipoResposta == "MES") {
      return schema
        .min(2, "Mínimo 2 alternativas")
        .test(
          "uma-correta",
          "Selecione 1 alternativa correta",
          (values) => values && values.some((alt) => alt.correta)
        )
        .test(
          "texto-alternativas",
          "Todas alternativas devem ter texto",
          (values) => values && values.every((alt) => alt.texto.trim() !== "")
        );
    }
    return schema;
  }),
});

export default validationSchema;
