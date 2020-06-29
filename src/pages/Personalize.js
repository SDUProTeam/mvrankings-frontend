import React from "react";
import TopBar from "../components/TopBar";
import { Typography } from "@material-ui/core";

export default class Personalize extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  buildLoginPage() {
    return (
      <div>
        <Typography variant="body1" color="textSecondary">
          请登录后操作
        </Typography>
      </div>
    );
  }

  buildChild() {
    return <></>;
  }

  render() {
    return (
      <TopBar mode={3} loginState={this.props.loginState}>
        {this.props.loginState.data.login
          ? this.buildChild()
          : this.buildLoginPage()}
      </TopBar>
    );
  }
}
