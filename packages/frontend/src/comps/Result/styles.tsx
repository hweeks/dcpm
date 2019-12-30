import styled from 'styled-components'

export const ResultWrapper = styled.div`
  height: ${props => props.theme.height8};
  width: ${props => props.theme.width100};
  display: flex;
  flex-flow: column;
  border-bottom: 1px solid ${props => props.theme.accent};
  margin: ${props => props.theme.spacing3} 0;
`

export const ResultTopRow = styled.div`
  height: ${props => props.theme.height5};
  width: ${props => props.theme.width100};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ResultBottomRow = styled.div`
  height: ${props => props.theme.height3};
  width: ${props => props.theme.width100};
  display: flex;
`

export const ResultName = styled.h2`
  font-family: ${props => props.theme.mainFont};
  font-size: ${props => props.theme.font3};
  font-weight: ${props => props.theme.heavyWeight};
`

export const ResultCommand = styled.span`
  font-family: ${props => props.theme.codeFont};
  font-size: ${props => props.theme.font2};
  font-weight: ${props => props.theme.heavyWeight};
  background-color: ${props => props.theme.codeBg};
  padding: ${props => props.theme.spacing0};
  border-radius: ${props => props.theme.spacing0};
`

export const ResultTags = styled.span`
  font-family: ${props => props.theme.mainFont};
  font-size: ${props => props.theme.font1};
  font-weight: ${props => props.theme.baseWeight};
`
