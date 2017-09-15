import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { Card as OriginalCard } from 'rebass'

const Card = styled(OriginalCard)`
  width: 100%;

  margin: 10px;
  /* content */
  overflow-y: scroll;
`
const IFrame = styled.iframe`
  width: 100%;
  height: 100%;

`

type GithubPageProps = {
  href: ?string,
  base64: ?string,
  markdown: ?string,
}
export default function GithubPage(props: GithubPageProps) {
  let displayFrame = ''
  if (props.href) {
    displayFrame = (<IFrame
      title="External Website Readme"
      src={props.href}
    />)
  }
  if (props.base64) {
    displayFrame = (<IFrame
      title="External Website Readme"
      src={`data:text/html;base64,${props.base64}`}
    />)
  }
  if (props.markdown) {
    displayFrame = (<ReactMarkdown
      source={props.markdown}
    />)
  }
  return (
    <Card>
      {displayFrame}
    </Card>
  )
}
