/* eslint-disable quotes */
import styled from "styled-components";

const Button = styled.button`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.7rem 0;
  margin: 1.5em 2.5em;
  width: 11rem;
  font-family: "Lato";
  font-size: 20px;
`;

export default Button;
