import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container, { Li } from "./styles";
import { TermsOfUse } from "src/components/TermsOfUse";
import { PrivacyPolicy } from "src/components/PrivacyPolicy";

function TermsAndPolicy() {
  const [activeTab, setActiveTab] = useState("termos-de-uso");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab === "politica-de-privacidade" || tab === "termos-de-uso") {
      setActiveTab(tab);
    }
  }, [location.search]);

  function handleTab(event) {
    const value = event.target.getAttribute("value");
    console.log(value);
    setActiveTab(value);
  }
  return (
    <Container>
      <header>
        <ul>
          <Li
            value="termos-de-uso"
            isActive={activeTab == "termos-de-uso"}
            onClick={handleTab}
          >
            Termos de Uso
          </Li>
          <Li
            value="politica-de-privacidade"
            isActive={activeTab == "politica-de-privacidade"}
            onClick={handleTab}
          >
            Política de Privacidade
          </Li>
        </ul>
      </header>
      <section>
        {activeTab == "termos-de-uso" ? (
          <TermsOfUse />
        ) : activeTab == "politica-de-privacidade" ? (
          <PrivacyPolicy />
        ) : (
          ""
        )}
      </section>
    </Container>
  );
}

export default TermsAndPolicy;
