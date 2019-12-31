import styled from 'styled-components'
import * as ReactMarkdown from 'react-markdown';

export const PackageWrapper = styled.div`
  min-height: ${props => props.theme.heightFull};
  display: flex;
  flex-flow: column;
`

export const PackageInfoWrapper = styled.div`
  display: flex;
`

export const PackageHeader = styled.div`
  width: 100%;
`

export const PackageStats = styled.div`
  width: 30%;
  display: flex;
  flex-flow: column;
  padding: 0 ${props => props.theme.spacing3};
`

export const PackageStat = styled.div`
  width: 100%;
  padding: ${props => props.theme.spacing3} 0;
`

export const PackageTitle = styled.h2`
  font-family: ${props => props.theme.mainFont};
  font-size: ${props => props.theme.font5};
  font-weight: ${props => props.theme.heavyWeight};
  color: ${props => props.theme.primary};
  margin: ${props => props.theme.spacing4} 0;
`

export const PackageAbout = styled(ReactMarkdown)`
  display: flex;
  flex-flow: column;
  font-size: 20px;
  width: 70%;
   @font-face {
    font-family: octicons-link;
    src: url(data:font/woff;charset=utf-8;base64,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) format('woff');
  }
 .octicon {
    display: inline-block;
    fill: currentColor;
    vertical-align: text-bottom;
  }
 .anchor {
    float: left;
    line-height: 1;
    margin-left: -20px;
    padding-right: 4px;
  }
 .anchor:focus {
    outline: none;
  }
  h1 .octicon-link,
  h2 .octicon-link,
  h3 .octicon-link,
  h4 .octicon-link,
  h5 .octicon-link,
  h6 .octicon-link {
    color: #1b1f23;
    vertical-align: middle;
    visibility: hidden;
  }
  h1:hover .anchor,
  h2:hover .anchor,
  h3:hover .anchor,
  h4:hover .anchor,
  h5:hover .anchor,
  h6:hover .anchor {
    text-decoration: none;
  }
  h1:hover .anchor .octicon-link,
  h2:hover .anchor .octicon-link,
  h3:hover .anchor .octicon-link,
  h4:hover .anchor .octicon-link,
  h5:hover .anchor .octicon-link,
  h6:hover .anchor .octicon-link {
    visibility: visible;
  }
  details {
    display: block;
  }
  summary {
    display: list-item;
  }
  a {
    background-color: transparent;
  }
  a:active,
  a:hover {
    outline-width: 0;
  }
  strong {
    font-weight: inherit;
    font-weight: bolder;
  }
  h1 {
    font-size: 2em;
    margin: .67em 0;
  }
  img {
    border-style: none;
  }
  code,
  kbd,
  pre {
    font-family: monospace,monospace;
    font-size: 1em;
  }
  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }
  input {
    font: inherit;
    margin: 0;
  }
  input {
    overflow: visible;
  }
  [type=checkbox] {
    box-sizing: border-box;
    padding: 0;
  }
  * {
    box-sizing: border-box;
  }
  input {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  a {
    color: #0366d6;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  strong {
    font-weight: 600;
  }
  em {
    font-style: italic;
  }
  hr {
    background: transparent;
    border: 0;
    border-bottom: 1px solid #dfe2e5;
    height: 0;
    margin: 15px 0;
    overflow: hidden;
  }
  hr:before {
    content: "";
    display: table;
  }
  hr:after {
    clear: both;
    content: "";
    display: table;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  td,
  th {
    padding: 0;
  }
  details summary {
    cursor: pointer;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 0;
    margin-top: 0;
  }
  h1 {
    font-size: 32px;
  }
  h1,
  h2 {
    font-weight: 600;
  }
  h2 {
    font-size: 24px;
  }
  h3 {
    font-size: 20px;
  }
  h3,
  h4 {
    font-weight: 600;
  }
  h4 {
    font-size: 16px;
  }
  h5 {
    font-size: 14px;
  }
  h5,
  h6 {
    font-weight: 600;
  }
  h6 {
    font-size: 12px;
  }
  p {
    margin-bottom: 10px;
    margin-top: 0;
  }
  blockquote {
    margin: 0;
  }
  ol,
  ul {
    margin-bottom: 0;
    margin-top: 0;
    padding-left: 0;
  }
  ol ol,
  ul ol {
    list-style-type: lower-roman;
  }
  ol ol ol,
  ol ul ol,
  ul ol ol,
  ul ul ol {
    list-style-type: lower-alpha;
  }
  dd {
    margin-left: 0;
  }
  code,
  pre {
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
    font-size: 12px;
  }
  pre {
    margin-bottom: 0;
    margin-top: 0;
  }
  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }
  blockquote,
  dl,
  ol,
  p,
  pre,
  table,
  ul {
    margin-bottom: 16px;
    margin-top: 0;
  }
  hr {
    background-color: #e1e4e8;
    border: 0;
    height: .25em;
    margin: 24px 0;
    padding: 0;
  }
  blockquote {
    border-left: .25em solid #dfe2e5;
    color: #6a737d;
    padding: 0 1em;
  }
  blockquote>:first-child {
    margin-top: 0;
  }
  blockquote>:last-child {
    margin-bottom: 0;
  }
  kbd {
    background-color: #fafbfc;
    border: 1px solid #c6cbd1;
    border-bottom-color: #959da5;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #959da5;
    color: #444d56;
    display: inline-block;
    font-size: 11px;
    line-height: 10px;
    padding: 3px 5px;
    vertical-align: middle;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    line-height: 1.25;
    margin-bottom: 16px;
    margin-top: 24px;
  }
  h1 {
    font-size: 2em;
  }
  h1,
  h2 {
    border-bottom: 1px solid #eaecef;
    padding-bottom: .3em;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.25em;
  }
  h4 {
    font-size: 1em;
  }
  h5 {
    font-size: .875em;
  }
  h6 {
    color: #6a737d;
    font-size: .85em;
  }
  ol,
  ul {
    padding-left: 2em;
  }
  ol ol,
  ol ul,
  ul ol,
  ul ul {
    margin-bottom: 0;
    margin-top: 0;
  }
  li {
    word-wrap: break-all;
  }
  li>p {
    margin-top: 16px;
  }
  li+li {
    margin-top: .25em;
  }
  dl {
    padding: 0;
  }
  dl dt {
    font-size: 1em;
    font-style: italic;
    font-weight: 600;
    margin-top: 16px;
    padding: 0;
  }
  dl dd {
    margin-bottom: 16px;
    padding: 0 16px;
  }
  table {
    display: block;
    overflow: auto;
    width: 100%;
  }
  table th {
    font-weight: 600;
  }
  table td,
  table th {
    border: 1px solid #dfe2e5;
    padding: 6px 13px;
  }
  table tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
  }
  table tr:nth-child(2n) {
    background-color: #f6f8fa;
  }
  img {
    background-color: #fff;
    box-sizing: content-box;
    max-width: 100%;
  }
  img[align=right] {
    padding-left: 20px;
  }
  img[align=left] {
    padding-right: 20px;
  }
  code {
    background-color: rgba(27,31,35,.05);
    border-radius: 3px;
    font-size: 85%;
    margin: 0;
    padding: .2em .4em;
  }
  pre {
    word-wrap: normal;
  }
  pre>code {
    background: transparent;
    border: 0;
    font-size: 100%;
    margin: 0;
    padding: 0;
    white-space: pre;
    word-break: normal;
  }
  pre {
    background-color: #f6f8fa;
    border-radius: 3px;
    font-size: 85%;
    line-height: 1.45;
    overflow: auto;
    padding: 16px;
  }
  pre code {
    background-color: transparent;
    border: 0;
    display: inline;
    line-height: inherit;
    margin: 0;
    max-width: auto;
    overflow: visible;
    padding: 0;
    word-wrap: normal;
  }
  kbd {
    background-color: #fafbfc;
    border: 1px solid #d1d5da;
    border-bottom-color: #c6cbd1;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #c6cbd1;
    color: #444d56;
    display: inline-block;
    font: 11px SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
    line-height: 10px;
    padding: 3px 5px;
    vertical-align: middle;
  }
  hr {
    border-bottom-color: #eee;
  }
`;
