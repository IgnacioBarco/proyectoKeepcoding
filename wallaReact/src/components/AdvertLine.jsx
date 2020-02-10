import React, { Component } from "react";
import MainContext from "../services/MainContext";
import { withRouter } from "react-router-dom";

class AdvertLine extends Component {
  goToDetail = () => {
    this.props.history.push(`/advert/${this.props.advert._id}`);
  };

  render() {
    const { advert } = this.props;

    return (
      <div
        style={{
          cursor: "pointer"
        }}
        key={advert._id}
        className="col-4"
        onClick={this.goToDetail}
      >
        <h5
          style={{
            color: advert.tags.includes(this.context.tag) ? "green" : "red"
          }}
        >
          {advert.name}
        </h5>
      </div>
    );
  }
}

AdvertLine.contextType = MainContext;

export default withRouter(AdvertLine);
