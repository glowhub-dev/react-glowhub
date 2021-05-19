import React, { Component } from 'react'
import { render } from 'react-dom'

import { GlowHubLoader } from '../../src'

export default class Demo extends Component {
  render() {
    return <div>
      <h1>react-glowhub Demo</h1>
      <GlowHubLoader
        clientID='GH-JNIALL0KOBA'
      />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
