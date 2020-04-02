import React, { Component } from 'react'
import Conditional from './Conditional'
import LandingPage from './LandingPage'

class LoadingScreen extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    setTimeout( () => {
      this.setState({
        isLoading: false
      })
    }, 1500)
  }
  render() {
    return (
      <div>
        {this.state.isLoading ? <Conditional /> : <LandingPage />}
      </div>
    )
  }
}

export default LoadingScreen ;