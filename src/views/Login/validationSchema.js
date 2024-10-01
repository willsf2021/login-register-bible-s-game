import * as Yup from "yup";

export default Yup.object({
    username: Yup.string().required("O nome de usuário é obrigatório"),
    password: Yup.string().required("A senha é obrigatória"),
  })