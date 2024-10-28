import React from "react";
import Container from "./styles";
import PropTypes from "prop-types";
export default function StyledInput({
  formik,
  name,
  type = "text",
  placeholder,
}) {
  const hasError = formik.touched[name] && formik.errors[name];
  return (
    <Container hasError={hasError}>
      <input
        id={name}
        name={name}
        type={type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={type === "checkbox" ? undefined : formik.values[name]}
        checked={type === "checkbox" ? formik.values[name] : undefined}
        placeholder={type !== "checkbox" ? placeholder || "" : undefined}
        required
      />
      {formik.touched[name] && formik.errors[name] ? (
        <span className="error">{formik.errors[name]}</span>
      ) : null}
    </Container>
  );
}

StyledInput.propTypes = {
  formik: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};
