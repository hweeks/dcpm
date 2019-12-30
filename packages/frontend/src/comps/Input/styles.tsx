import styled from 'styled-components'

export const InputContainer = styled.div`
  display: flex;
`

export const InputField = styled.input`
  height: ${props => props.theme.height7};
  padding: ${props => props.theme.spacing0};
  width: 100%;
  border-radius: ${props => props.theme.spacing0};
  border: 3px solid ${props => props.theme.primary};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  outline: none;
`

export const InputButton = styled.button`
  height: ${props => props.theme.height7};
  padding: ${props => props.theme.spacing0} ${props => props.theme.spacing2} ${props => props.theme.spacing0} ${props => props.theme.spacing0};
  border-radius: ${props => props.theme.spacing0};
  border: 1px solid ${props => props.theme.primary};
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
  font-weight: ${props => props.theme.heavyWeight};
  width: auto;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  outline: none;
  cursor: pointer;
`
