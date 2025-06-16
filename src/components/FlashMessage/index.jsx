import React, { useEffect, useRef } from "react";
import { FlashWrapper } from "./styles";
import { useFlash } from "../../contexts/FlashContext";

const FlashMessage = () => {
  const { flash } = useFlash();
  const flashRef = useRef(null);

  useEffect(() => {
    if (flash && flashRef.current) {
      flashRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [flash]);

  if (!flash) return null;

  return (
    <div ref={flashRef}>
      <FlashWrapper type={flash.type}>{flash.message}</FlashWrapper>
    </div>
  );
};

export default FlashMessage;
