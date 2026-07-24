import * as React from "react";
import { StepWrapper } from "./styles";
import { ExternalNavItem, NavItem } from "../../comps/Nav/styles";

export const Home = () => (
  <div>
    <StepWrapper>
      To use this you're gonna need to first install dcpm from npm. After that
      check out our documentation under the 'Docs' link in the nav.
    </StepWrapper>
    <ExternalNavItem
      href="https://www.npmjs.com/package/@dcpm/cli"
      target="_blank"
    >
      @dcpm/cli
    </ExternalNavItem>
    <StepWrapper>
      After that's done click on "search" above to see what's available.
    </StepWrapper>
  </div>
);
