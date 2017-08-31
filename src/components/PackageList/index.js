import React from 'react'
import styled from 'styled-components'
import { Card as OriginalCard, ButtonTransparent } from 'rebass'

const Card = styled(OriginalCard)`
  height: 100%;

  margin: 10px 0 10px 10px;
  /* content */
  overflow: hidden;
`

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`
const ItemHeader = styled.h3`
  text-align: left;
`
const ItemContent = styled.h3`
  text-align: right;
`
const ButtonTransparentRight = styled(ButtonTransparent)`
  width: 30%;
`

type ItemProps = {
  name: string,
  href: string,
  libraryDescription: string,
}

type ListProps = {
  data: {
      [className: string]: {
      className: string,
      classDescription: string,
      urlList: Array<ItemProps>,
    }
  },
  selectItem: Function,
}
export default function PackageList(props: ListProps) {
  return (
    <Card>
      {props.data['Admin Panels'].urlList.map(packageInfo => (
        <ItemContainer>
          <ButtonTransparent
            key={packageInfo.href}
            onClick={(event) => { event.preventDefault(); props.selectItem(packageInfo) }}
          >
            <ItemContent>{packageInfo.libraryDescription}</ItemContent>
          </ButtonTransparent>
          <ButtonTransparentRight>
            <ItemHeader>{packageInfo.name}</ItemHeader>
          </ButtonTransparentRight>
        </ItemContainer>
      ))}
    </Card>
  )
}
