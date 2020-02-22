import * as React from "react";
import { NavWrapper, NavItems, NavItem, ExternalNavItem } from "./styles";

export const Nav = () => (<NavWrapper>
  <NavItems>
    <NavItem to="/">DCPM</NavItem>
    <NavItem to="/search">Search</NavItem>
    <ExternalNavItem href="https://docs.dcpm.dev" target="_blank">Docs</ExternalNavItem>
  </NavItems>
</NavWrapper>)
