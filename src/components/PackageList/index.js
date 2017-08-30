import React from 'react'
import styled from 'styled-components'
import { Card as OriginalCard, ButtonTransparent } from 'rebass'

const Card = styled(OriginalCard)`
  height: 100%;

  margin: 10px 0 10px 10px;
  /* content */
  overflow-y: scroll;
`

const ItemContainer = styled.div`
  height: 100%;

  border-bottom-width: 1px;
  border-color: black;
`
const ItemHeader = styled.h3`
  text-align: right;
  padding-right: 10px;
`
const ItemContent = styled.h3`
  text-align: left;
  padding-left: 25px;
`

type ItemProps = {
  name: string,
  href: string,
  libraryDescription: string,
}
function Item(props: ItemProps) {
  return (
    <ItemContainer>
      <ItemHeader>{props.name}</ItemHeader>
      <ItemContent>{props.libraryDescription}</ItemContent>
    </ItemContainer>
  )
}

type ListProps = {
  data: {
      [className: string]: {
      className: string,
      classDescription: string,
      urlList: Array<ItemProps>,
    }
  },
  selectItem: Object => void,
}
export default function PackageList(props: ListProps) {
  return (
    <Card>
      {props.data['Admin Panels'].urlList.map(packageInfo => (
        <ButtonTransparent
          key={packageInfo.href}
          onClick={(event) => { event.preventDefault(); props.selectItem(packageInfo) }}
        >
          <Item
            {...packageInfo}
          />
        </ButtonTransparent>
      ))}
    </Card>
  )
}
