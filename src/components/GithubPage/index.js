import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { Card as OriginalCard } from 'rebass'

const Card = styled(OriginalCard)`
  width: 300px;

  margin: 10px;
  /* content */
  overflow-y: scroll;
`

type GithubPageProps = {
  href: ?string,
  markdown: ?string,
}
export default function GithubPage(props: GithubPageProps) {
  let displayFrame = ''
  if (props.href) {
    displayFrame = (<iframe
      title="Github Readme"
      className="reportpdf"
      src={`localhost:3001/?url=${props.href}`}
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
