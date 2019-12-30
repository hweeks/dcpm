import * as React from 'react'
import { ResultWrapper,
  ResultTopRow,
  ResultBottomRow,
  ResultName,
  ResultCommand,
  ResultTags
} from "./styles";
import { SearchResult } from '../../reducers/search';

export const Result = ({name, requestedVersion, tags}: SearchResult) => (<ResultWrapper>
  <ResultTopRow>
    <ResultName>{name}</ResultName>
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
