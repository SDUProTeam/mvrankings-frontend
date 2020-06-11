import React from "react";
import { useParams, withRouter } from "react-router-dom";
import { SubTopBar } from "../components/TopBar";

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match.params.id);
  }

  componentDidMount() {
    // Get detail
  }

  buildChild() {
    return <></>;
  }

  render() {
    return (
      <>
        <SubTopBar child={this.buildChild()} />
      </>
    );
  }
}

export default withRouter(DetailPage);
