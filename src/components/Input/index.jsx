import React from "react";
import Container from "./styles";
import PropTypes from "prop-types";
export default function StyledInput({ formik, name, type = "text", placeholder }) {
    return (
        <Container>
        <input
          id={name}
          name={name}
          type={type || "text"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          placeholder={placeholder || ""}
          required
        />
        {formik.touched[name] && formik.errors[name] ? (
          <span className="error">{formik.errors[name]}</span>
        ) : null}
      </Container>
    )
}

StyledInput.propTypes = {
    formik: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string
}