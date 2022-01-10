import * as React from "react";
import {
  InputButton,
  InputContainer,
  InputField,
  InputCloseIcon,
  InputWrapper,
} from "./styles";
import { CloseIcon } from "../Icons";

interface InputProps {
  value?: string;
  placeholder?: string;
  onChange: (term: string) => void;
  onSubmit: () => void;
  clear: () => void;
  buttonText: string;
}

const handleEnter = (submitFunction: () => void, e: React.KeyboardEvent) => {
  if (e && e.key === "Enter") {
    submitFunction();
  }
};

const handleChange = (
  searchUpdate: (term: string) => void,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const value = e && e.currentTarget && e.currentTarget.value;
  if (value || value === "") {
    searchUpdate(value);
  }
};

export const Input = ({
  value,
  placeholder,
  onChange,
  buttonText,
  onSubmit,
  clear,
}: InputProps) => (
  <InputContainer>
    <InputWrapper>
      <InputField
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange.bind(null, onChange)}
        onKeyUp={handleEnter.bind(null, onSubmit)}
      />
      <InputCloseIcon>
        <CloseIcon onClick={clear} />
      </InputCloseIcon>
    </InputWrapper>
    <InputButton
      type="submit"
      onClick={() => {
        onSubmit();
      }}
    >
      {buttonText}
    </InputButton>
  </InputContainer>
);
