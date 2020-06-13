import React from "react";
import { withRouter, Link } from "react-router-dom";
import { SubTopBar } from "../components/TopBar";
import { movieDetail } from "../api/api";
import "./Detail.css";
import { Typography, makeStyles, Grid, Paper, Divider } from "@material-ui/core";
import MovieRate from "../components/MovieRate";

const movieSourcesE2C = {
  douban: "豆瓣",
  maoyan: "猫眼",
  mtime: "时光网",
};

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fail: false,
      loading: true,
      data: {},
    };

    this.buildChild = this.buildChild.bind(this)
  }

  componentDidMount() {
    // Get detail
    movieDetail(this.props.match.params.id, (res) => {
      this.setState({
        fail: res instanceof Error,
        loading: false,
        data: this.preHandleData(res.data[0]),
      });
    });
  }

  preHandleData(data) {
    const tmp = {...data}
    if (tmp.runtime && tmp.runtime.match('[0-9]*[0-9]$')) {
      tmp.runtime = tmp.runtime + '分钟'
    }
    return tmp
  }

  buildBelow() {
    return (
      <div style={{ height: 300 }}>
        <div
          className="blurBackground"
          style={{ backgroundImage: `url(${this.state.data.cover})` }}
        ></div>
        <div className="headForeground">
          <img src={this.state.data.cover} alt=""></img>
          <div className="movieDetails">
            <div style={{ display: "flex" }}>
              <Typography variant="h5" className="movieName" noWrap>
                {this.state.data.name}
              </Typography>
              <MovieRate mobile={true} rate={this.state.data.rating} />
            </div>
            <Typography variant="body1" className="movieAdditionInfo" noWrap>
              {this.state.data.nameFrn}
            </Typography>
            <div style={{ flex: 1 }}></div>
            <Typography variant="body2" className="movieAdditionInfo" noWrap>
              导演：{(this.state.data.directors ?? []).join(" / ")}
            </Typography>
            <Typography variant="body2" className="movieAdditionInfo" noWrap>
              主演：{(this.state.data.stars ?? []).join(" / ")}
            </Typography>
            <Typography variant="body2" className="movieAdditionInfo" noWrap>
              编剧：{(this.state.data.writers ?? []).join(" / ")}
            </Typography>
            <Typography variant="body2" className="movieAdditionInfo" noWrap>
              类型：{(this.state.data.types ?? []).join(" / ")}
            </Typography>
            <Typography variant="body2" className="movieAdditionInfo" noWrap>
              时长：{this.state.data.runtime}
            </Typography>
            <Typography variant="body2" className="movieAdditionInfo" noWrap>
              区域：{(this.state.data.country ?? []).join(" / ")}
            </Typography>
            <Typography variant="body2" className="movieAdditionInfo" noWrap>
              上映日期：{(this.state.data.releaseDate ?? []).join(" / ")}
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  buildInfoLine(key, value) {
    return (
      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <div style={{ display: 'flex' }}>
          <Typography className="info-key" color="textSecondary" variant="subtitle1" component="span">
            {key}
          </Typography>
          <Typography className="info-value" color="textPrimary" variant="body1" component="span">
            {value}
          </Typography>
        </div>
      </Grid>
    );
  }

  buildInfoLink(key, value, link) {
    return (
      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <div style={{ display: 'flex' }}>
          <Typography className="info-key" color="textSecondary" variant="subtitle1" component="span">
            {key}
          </Typography>
          <Typography className="info-value" color="textPrimary" variant="body1" component="span">
            <a href={link} target="_blank" style={{ textDecoration: "none", color: 'inherit' }}>
                {value}
            </a>
          </Typography>
        </div>
      </Grid>
    );
  }

  buildInfoBlock(title, child) {
    return (
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Grid container spacing={4}>
          {child}
        </Grid>
      </Grid>
    )
  }

  buildSubInfoBlock(title, text) {
    return (
      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <div>
          <Typography variant="subtitle1" gutterBottom>{title}</Typography>
          <Typography variant="body1" color="textSecondary">{text}</Typography>
        </div>
      </Grid>
    )
  }

  buildChild() {
    const item = this.state.data;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>

          <Grid container spacing={4}>
            {this.buildInfoBlock('影片简介', (
              <Grid item>
                <Typography color="textSecondary" variant="body1" component="p">
                  {item.summary}
                </Typography>
              </Grid>
            ))}
            <Grid item xs={12}><Divider/></Grid>
            {this.buildInfoBlock('影片信息', (
              <>
                {this.buildInfoLine("影片名称", item.name ?? "")}
                {this.buildInfoLine("外文名称", item.nameFrn ?? "")}
                {this.buildInfoLine(
                  "评分",
                  `${item.rating ?? 0} (${item.rateNum ?? 0}次)`
                )}
                {this.buildInfoLine(
                  "数据来源",
                  `${movieSourcesE2C[item.source ?? ""] ?? ""}`
                )}
                {this.buildInfoLine("类型", (item.types ?? []).join(" / "))}
                {this.buildInfoLine("区域", (item.country ?? []).join(" / "))}
                {this.buildInfoLine("片长", item.runtime ?? "")}
                {this.buildInfoLine("上映日期", (item.releaseDate ?? []).join(" / "))}
                {this.buildInfoLine("语言", (item.language ?? []).join(" / "))}
                {item.imdb === undefined
                  ? this.buildInfoLine("IMDb链接", "")
                  : this.buildInfoLink(
                      "IMDb链接",
                      `tt${item.imdb}`,
                      `https://www.imdb.com/title/tt${item.imdb}/?ref_=nv_sr_srsg_0`
                    )}
              </>
            ))}
            <Grid item xs={12}><Divider/></Grid>
            {this.buildInfoBlock('演职人员', (
              <>
                {this.buildSubInfoBlock('主演', (item.stars ?? []).join(" / "))}
                {this.buildSubInfoBlock('导演', (item.directors ?? []).join(" / "))}
                {this.buildSubInfoBlock('编剧', (item.writers ?? []).join(" / "))}
              </>
            ))}
          </Grid>
          
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
          <Paper className="paper">
            <Typography variant="h6">影片推荐</Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <>
        <SubTopBar below={this.buildBelow()}>{this.buildChild()}</SubTopBar>
      </>
    );
  }
}

export default withRouter(DetailPage);
