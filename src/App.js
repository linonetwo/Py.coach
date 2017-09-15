import React, { Component } from 'react';
import axios from 'axios'
import cheerio from 'cheerio'
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
    docAnchors: [],
  }

  componentWillMount() {
    this.setState({ data });
  }

  getDocURL = (readmeURL) => {
    axios.get(`http://${global.location.hostname}:3001/?url=${readmeURL}`)
      .then(({ status, data: anchors }) => {
        if (status === 200) {
          console.log(anchors)
          this.setState({ docAnchors: anchors })
        }
      })
      .catch(error => console.error(readmeURL, error))
  }

  getReadme = async (selectedItem) => {
    const { host, pathname } = URL(selectedItem.href)
    if (host === 'github.com') {
      const readme = (await this.githubGetter(`${pathname}/contents/`)).data
      this.setState({ selectedItem: { ...selectedItem, base64: readme } })
    } else {
      this.setState({ selectedItem: { ...selectedItem } })
    }
  }

  githubGetter = axios.create({
    baseURL: 'https://api.github.com/repos',
    timeout: 2000,
    headers: { Accept: 'application/vnd.github.v3.raw' },
  })

  selectPackage = async (selectedItem) => {
    this.getReadme(selectedItem)
    this.getDocURL(selectedItem.href)
  }

  selectDoc = async (selectedItem) => {
    const iframe = document.getElementById('iframe');
    iframe.srcdoc = 'fred rules';
    // this.setState({ selectedItem: {
    //   href: this.state.docAnchors[0].anchorHref,
    // } })
  }

  render() {
    return (
      <Container>
        <LeftColumn>
          <Search />
          <PackageList
            data={data}
            selectPackage={this.selectPackage}
            selectDoc={this.selectDoc}
          />
        </LeftColumn>
        <RightDisplay>
          <GithubPage
            href={this.state.selectedItem.href}
            base64={this.state.selectedItem.base64}
          />
        </RightDisplay>
      </Container>
    );
  }
}

export default App;
