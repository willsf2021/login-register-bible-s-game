import styled from "styled-components";

export const FlashWrapper = styled.div`
  padding: 1rem;
  background-color: ${({ type }) =>
    type === "success"
      ? "#d4edda"
      : type === "error"
      ? "#f8d7da"
      : "#fff3cd"};
  color: ${({ type }) =>
    type === "success"
      ? "#155724"
      : type === "error"
      ? "#721c24"
      : "#856404"};
  border-left: 6px solid
    ${({ type }) =>
      type === "success"
        ? "#28a745"
        : type === "error"
        ? "#dc3545"
        : "#ffc107"};
  border-radius: 4px;
  margin-bottom: 1rem;
  font-weight: 500;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
