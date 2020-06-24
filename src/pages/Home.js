import React from "react";
import { withRouter } from "react-router-dom";

import { search } from "../api/api";
import TopBar from "../components/TopBar";
import SearchBar from "../components/SearchBar";
import { getUrlParam } from "../utils/URLParamUtil";
import SquareList from "../components/SquareList";
import DetailedList from "../components/DetailedList";
import "./Home.css";
import { Box, Snackbar } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import MuiAlert from "@material-ui/lab/Alert";

const movieSources = ["任意", "豆瓣", "猫眼", "时光网"];

const movieCountries = ["任意", "中国大陆", "港澳台", "日本", "韩国", "美国"];

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      mode: parseInt(getUrlParam(props.history.location.search, "mode") ?? 0),
      data: {},
      searchData: {
        name: "",
        rate_min: 0,
        rate_max: 10,
        time_min: 1895,
        time_max: new Date().getFullYear() + 5,
        directors: "",
        stars: "",
        writers: "",
        country: movieCountries[0],
        source: movieSources[0],
      },
      totalPages: 1,
      curPage: 1,
      snackBar: {
        open: false,
        msg: "",
      },
      orderBy: "rate_douban",
      order: "desc",
    };

    this.changeMode = this.changeMode.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.updateSearchData = this.updateSearchData.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
  }

  componentDidMount() {
    this.doSearch(this.state.searchData);
  }

  handlePageChange(event, value) {
    if (this.state.curPage !== value) {
      this.setState({
        curPage: value,
      });

      this.doSearch(this.state.searchData, value);
    }
  }

  offset(page) {
    return (page - 1) * 20;
  }

  updateSearchData(data) {
    this.setState({
      searchData: data,
    });
  }

  handleOrderChange(prop, order) {
    this.setState(
      {
        orderBy: prop,
        order: order,
      },
      () => {
        this.doSearch(this.state.searchData, this.state.curPage);
      }
    );
  }

  buildChild() {
    let list = undefined;

    if (this.state.mode === 0) {
      list = <SquareList data={this.state.data} loading={this.state.loading} />;
    } else {
      list = (
        <DetailedList
          data={this.state.data}
          loading={this.state.loading}
          orderBy={this.state.orderBy}
          order={this.state.order}
          orderReq={this.handleOrderChange}
        />
      );
    }

    const handleClose = () => {
      this.setState({
        snackBar: {
          open: false,
          msg: "",
        },
      });
    };
    const vertical = "bottom";
    const horizontal = "right";
    const Alert = (props) => {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    return (
      <>
        <SearchBar
          doSearch={this.doSearch}
          update={this.updateSearchData}
          searchData={this.state.searchData}
          loading={this.state.loading}
        />
        <Box className="list">{list}</Box>
        <div
          className="pagination-wrapper"
          style={{ paddingTop: 16, paddingBottom: 16 }}
        >
          <Pagination
            disabled={this.state.loading}
            count={this.state.totalPages}
            page={this.state.curPage}
            onChange={this.handlePageChange}
            size="large"
          />
        </div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={this.state.snackBar.open}
          onClose={handleClose}
          key={vertical + horizontal}
          autoHideDuration={2000}
        >
          <Alert severity="error">{this.state.snackBar.msg}</Alert>
        </Snackbar>
      </>
    );
  }

  changeMode(mode) {
    this.setState({
      mode: mode,
    });
  }

  doSearch(data, page) {
    this.setState({
      loading: true,
    });

    if (this.state.mode === 0) {
      search(data, "-rating", this.offset(page ?? 1), "search", (res) => {
        if (res.err) {
          this.setState({
            data: { data: [], total: 0 },
            loading: false,
            totalPages: 1,
            curPage: 1,
            snackBar: {
              open: true,
              msg: "请求失败：" + res.err.message,
            },
          });
        } else {
          this.setState({
            data: res,
            loading: false,
            totalPages: Math.ceil(Math.max(res.total, 1) / 20),
            curPage: page ?? 1,
          });
        }
      });
    } else {
      search(
        data,
        (this.state.order === "desc" ? "-" : "") + this.state.orderBy,
        this.offset(page ?? 1),
        "fusion",
        (res) => {
          if (res.err) {
            this.setState({
              data: { data: [], total: 0 },
              loading: false,
              totalPages: 1,
              curPage: 1,
              snackBar: {
                open: true,
                msg: "请求失败：" + res.err.message,
              },
            });
          } else {
            this.setState({
              data: res,
              loading: false,
              totalPages: Math.ceil(Math.max(res.total, 1) / 20),
              curPage: page ?? 1,
            });
          }
        }
      );
    }
  }

  render() {
    return <TopBar mode={this.state.mode} loginState={this.props.loginState}>
      {this.buildChild()}
    </TopBar>
  }
}

export default withRouter(HomePage);
