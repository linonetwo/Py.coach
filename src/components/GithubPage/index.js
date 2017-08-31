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
