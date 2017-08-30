import React from 'react'
import styled from 'styled-components'
import { Card as OriginalCard, Textarea as OriginalTextarea } from 'rebass'

const Card = styled(OriginalCard)`
  height: 50px;

  margin: 10px 0 0 10px;
`
const Textarea = styled(OriginalTextarea)`
  font-size: 30px;
  height: 100%;
  vertical-align: center;
`

export default function Search() {
  return (
    <Card>
      <Textarea
        rows={1}
        defaultValue="request"
      />
    </Card>
  )
}
