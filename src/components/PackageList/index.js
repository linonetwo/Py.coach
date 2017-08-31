import React, { Component } from 'react'
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
  packageInfo: {
    name: string,
    href: string,
    libraryDescription: string,
  },
  selectPackage: Function,
  selectDoc: Function,
}

class Item extends Component {
  state = {
    openDoc: false,
  }

  props: ItemProps

  render() {
    return (
      <ItemContainer key={this.props.packageInfo.href}>
        <ButtonTransparent
          onClick={(event) => {
            event.preventDefault()
            if (this.state.openDoc) {
              this.props.selectDoc(this.props.packageInfo)
            } else {
              this.props.selectPackage(this.props.packageInfo)
            }
            this.setState({ openDoc: !this.state.openDoc })
          }}
        >
          <ItemContent>{this.props.packageInfo.libraryDescription}</ItemContent>
          <ItemHeader>{this.props.packageInfo.name}</ItemHeader>
        </ButtonTransparent>
      </ItemContainer>
    )
  }
}

type ListProps = {
  data: {
      [className: string]: {
      className: string,
      classDescription: string,
      urlList: Array<ItemProps>,
    }
  },
  selectPackage: Function,
  selectDoc: Function,
}
export default function PackageList(props: ListProps) {
  return (
    <Card>
      {props.data['Admin Panels'].urlList.map(packageInfo => (<Item
        key={packageInfo.href}
        packageInfo={packageInfo}
        {...props}
      />))}
    </Card>
  )
}
