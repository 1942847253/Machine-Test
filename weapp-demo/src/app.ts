import { Component } from 'react'
import "@taroify/core/index.scss"
import './app.less'


class App extends Component {
  render() {
    return this.props.children
  }
}

export default App
