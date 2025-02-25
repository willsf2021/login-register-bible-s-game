import Container from "./styles";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

export const CustomSelect = ({
  options,
  selectedValue,
  onSelect,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <Container $isopen={isOpen}>
      <div className="selectBtn" onClick={toggleMenu}>
        <span>{selectedValue || placeholder}</span>
        {isOpen ? (
          <FaChevronUp color="#7e7e7e" />
        ) : (
          <FaChevronDown color="#7e7e7e" />
        )}
      </div>
      {isOpen && (
        <ul>
          {options.map((option) => (
            <li key={option.id} onClick={() => handleSelect(option)}>
              {option.nome}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};
