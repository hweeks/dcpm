import * as React from "react";
import styled from "styled-components";

interface BasicProps {
  onClick: (e?: React.MouseEvent) => void;
}

const BlankButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  svg {
    fill: ${(props) => props.theme.accent};
  }
  &:hover {
    svg {
      fill: ${(props) => props.theme.primary};
    }
    cursor: pointer;
  }
`;

export const CloseIcon = ({ onClick }: BasicProps) => (
  <BlankButton onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width=""
      height=""
      viewBox="0 0 456 512"
    >
      <title>cancel</title>
      <path d="M64 388L196 256 64 124 96 92 228 224 360 92 392 124 260 256 392 388 360 420 228 288 96 420 64 388Z" />
    </svg>
  </BlankButton>
);
