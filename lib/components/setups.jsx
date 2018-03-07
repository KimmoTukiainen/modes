import React from "react";

class Setups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setups: []
    };
  }

  componentDidMount() {
      this.props.getSetups
  }

  render() {
    return <div>Setups</div>;
  }
}

export default Setups;
