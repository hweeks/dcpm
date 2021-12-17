import * as React from "react";
import { SearchResult } from "../../reducers/search";
import {
  PackageAbout,
  PackageWrapper,
  PackageStats,
  PackageInfoWrapper,
  PackageHeader,
  PackageTitle,
  PackageStat,
} from "./styles";
import { breaks } from "../../utils";

export const PackageInfo = ({
  name,
  versions,
  requestedVersion,
  tags,
  about,
  owner,
  downloads,
}: SearchResult) => (
  <PackageWrapper>
    <PackageHeader>
      <PackageTitle>{name}</PackageTitle>
    </PackageHeader>
    <PackageInfoWrapper>
      <PackageAbout source={about.replace("\\n", "\n")} plugins={[breaks]} />
      <PackageStats>
        <PackageStat>author: {owner}</PackageStat>
        <PackageStat>latest: {requestedVersion}</PackageStat>
        <PackageStat>versions: {versions?.join(", ")}</PackageStat>
        <PackageStat>downloads: {downloads}</PackageStat>
        <PackageStat>tags: {tags?.join(", ")}</PackageStat>
      </PackageStats>
    </PackageInfoWrapper>
  </PackageWrapper>
);
