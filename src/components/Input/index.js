/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
import styled from "styled-components";
import PropTypes from "prop-types";

const InputBase = styled.input`
  width: 11rem;
  height: 40px;
  border-radius: 4px;
  margin: 1.5em 2.5em;
  font-size: 20px;
  font-family: "Lato";
  text-align: center;

  :focus {
    border: 3px solid #2f4055;
  }
`;

//geralmente trabalharemos assim
//passar o props dessa maneira não é recomendado pois você não sabe o que está recebendo
export default function Input({ onChange, placeholder, ...props }) {
  return (
    <div>
      <InputBase placeholder={placeholder} onChange={onChange} {...props} />
    </div>
  );
}

Input.defaultProps = {
  value: "",
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

/* export default Input; */
