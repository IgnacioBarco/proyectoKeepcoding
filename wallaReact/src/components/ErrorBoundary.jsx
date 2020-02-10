import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  
  componentDidCatch(error, errorInfo) {
    console.log(error.message);
    console.log(error.stack);
    console.log(errorInfo);
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return <h1>Error en ErrorBoundary: {this.state.error}</h1>;
    } else {
      return this.props.children;
    }
  }
}
