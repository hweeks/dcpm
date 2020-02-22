import * as React from 'react'
import { ResultWrapper,
  ResultTopRow,
  ResultBottomRow,
  ResultName,
  ResultCommand,
  ResultTags
} from "./styles";
import { SearchResult } from '../../reducers/search';
import { Link } from 'react-router-dom';

const handleSelect = (selectCallback: (pkg: string) => void, name : string) => {
  selectCallback(name)
}

interface ResultProps extends SearchResult {
  select: (pkg: string) => void
}

export const Result = ({name, requestedVersion, tags, select}: ResultProps) => (<ResultWrapper>
  <ResultTopRow>
    <ResultName to={`/package/${name}`}>{name}</ResultName>
    <ResultCommand>
      dcpm get {name}@{requestedVersion}
    </ResultCommand>
  </ResultTopRow>
  <ResultBottomRow>
    <ResultTags>
      tags: {tags && tags.join(', ')}
    </ResultTags>
  </ResultBottomRow>
</ResultWrapper>)
