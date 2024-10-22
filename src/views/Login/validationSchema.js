import * as Yup from "yup";

export default Yup.object({
  username: Yup.string().required("O nome de usuário é obrigatório"),
  name: Yup.string().required("O nome é obrigatório"),
  password: Yup.string().required("A senha é obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "As senhas precisam ser iguais")
    .required("A confirmação de senha é obrigatória"),
  terms: Yup.bool()
    .oneOf([true], "Você deve aceitar os Termos de Uso")
    .required("É obrigatório aceitar os Termos de Uso"),
  email: Yup.string().required("O email é obrigatório"),
});
