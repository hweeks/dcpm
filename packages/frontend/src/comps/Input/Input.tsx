import * as React from 'react'
import { InputButton, InputContainer, InputField } from "./styles";

interface InputProps {
  value?: string
  placeholder?: string
  onChange: (term: string) => void,
  onSubmit: () => void,
  buttonText: string
}

const handleEnter = (submitFunction : () => void, e : React.KeyboardEvent) => {
  if (e && e.key === 'Enter') {
    submitFunction()
  }
}

const handleChange = (searchUpdate : (term: string) => void, e : React.ChangeEvent<HTMLInputElement>) => {
  const value = e && e.currentTarget && e.currentTarget.value
  if (value) {
    searchUpdate(value)
  }
}

export const Input = ({value, placeholder, onChange, buttonText, onSubmit} : InputProps) => (
  <InputContainer>
    <InputField
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={handleChange.bind(null, onChange)}
      onKeyUp={handleEnter.bind(null, onSubmit)}
      />
    <InputButton
      type="submit"
      onClick={() => {
        onSubmit()
      }}
      >
      {buttonText}
    </InputButton>
  </InputContainer>
)
