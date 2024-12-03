import Container from "./styles";
import Logo from "src/assets/logo-vetor.png";
import MenuHamburger from "src/assets/menu-hamburger.svg";

export const Header = () => {
  return (
    <Container>
      <header>
        <img src={Logo} alt="Logo" />
        <img
          className="menuHamburger"
          src={MenuHamburger}
          alt="Menu Hamburguer"
        />
      </header>
    </Container>
  );
};
