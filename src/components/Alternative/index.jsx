import Container, { CheckboxContainer, CheckMark, Label } from "./styles";
import { HiOutlineTrash } from "react-icons/hi";

export const Alternative = ({
  content,
  isChecked,
  id,
  deleteAlternative,
  toggleCorrect,
}) => {
  return (
    <Container>
      <p>{content}</p>
      <div className="bottomAlternative">
        <CheckboxContainer>
          <input
            id={id}
            type="checkbox"
            onChange={() => {
              toggleCorrect(id);
            }}
            checked={isChecked}
          />

          <CheckMark className="checkmark"></CheckMark>
          <Label htmlFor={id}>Alternativa Correta</Label>
        </CheckboxContainer>
        <HiOutlineTrash
          color="#bf4646"
          className="trash"
          onClick={() => {
            deleteAlternative(id);
          }}
        />
      </div>
    </Container>
  );
};
