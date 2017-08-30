import React, { Component } from 'react';
import axios from 'axios'
import URL from 'url-parse'
import styled from 'styled-components'
import PackageList from './components/PackageList'
import Search from './components/Search'
import GithubPage from './components/GithubPage'

import data from './data/AwsomePython/AwsomePython.json'

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: row;
`

const leftColumnWidth = '300px'
const LeftColumn = styled.nav`
  width: ${leftColumnWidth};

  display: flex;
  flex-direction: column;
`
const RightDisplay = styled.div`
  width: calc(100vw - ${leftColumnWidth});

  display: flex;
  flex-direction: row;
`

class App extends Component {
  state = {
    data: {},
    selectedItem: {},
  }

  componentWillMount() {
    this.setState({ data });
  }

  githubReadmeGetter = axios.create({
    baseURL: 'https://api.github.com/repos',
    timeout: 2000,
    headers: { Accept: 'application/vnd.github.v3.raw' },
  })

  selectPackage = async (selectedItem) => {
    const { host, pathname } = URL(selectedItem.href)
    if (host === 'github.com') {
      const readme = (await this.githubReadmeGetter(`${pathname}/readme`)).data
      this.setState({ selectedItem: { ...selectedItem, readme } })
    } else {
      this.setState({ selectedItem: { ...selectedItem } })
    }
  }

  render() {
    return (
      <Container>
        <LeftColumn>
          <Search />
          <PackageList
            data={data}
            selectItem={this.selectPackage}
          />
        </LeftColumn>
        <RightDisplay>
          <GithubPage
            href={this.state.selectedItem.href}
            markdown={this.state.selectedItem.readme}
          />
        </RightDisplay>
      </Container>
    );
  }
}

export default App;
