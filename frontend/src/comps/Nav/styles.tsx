import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavWrapper = styled.nav`
  width: ${(props) => props.theme.width100};
  padding: ${(props) => props.theme.spacing2} 0;
  display: flex;
`;

export const NavItems = styled.div`
  column-gap: ${(props) => props.theme.spacing8};
  columns: 3;
`;

export const NavItem = styled(Link)`
  text-decoration: none;
  display: block;
  color: ${(props) => props.theme.primary};
  &:visited {
    color: ${(props) => props.theme.primary};
  }
  &:hover {
    color: ${(props) => props.theme.accent};
  }
`;

export const ExternalNavItem = styled.a`
  text-decoration: none;
  display: block;
  color: ${(props) => props.theme.primary};
  &:visited {
    color: ${(props) => props.theme.primary};
  }
  &:hover {
    color: ${(props) => props.theme.accent};
  }
`;
