import Container, { CheckboxContainer, CheckMark, Label } from "./styles";
import { HiOutlineTrash } from "react-icons/hi";

export const Alternative = ({ content, label }) => {
  return (
    <Container>
      <p>{content}</p>
      <div>
        <CheckboxContainer>
          <input id="correta" type="checkbox" />

          <CheckMark className="checkmark"></CheckMark>
          <Label htmlFor="correta">Alternativa Correta</Label>
        </CheckboxContainer>
        <HiOutlineTrash color="#bf4646" className="trash" />
      </div>
    </Container>
  );
};
