import React from "react";
import { withRouter, Link } from "react-router-dom";
import { SubTopBar } from "../components/TopBar";
import { movieDetail } from '../api/api'
import './Detail.css'
import { Typography, makeStyles, Grid, Paper } from '@material-ui/core'
import MovieRate from '../components/MovieRate'

const movieSourcesE2C = {
  'douban': '豆瓣',
  'maoyan': '猫眼',
  'mtime': '时光网'
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fail: false,
      loading: true,
      data: {}
    }
  }

  componentDidMount() {
    // Get detail
    movieDetail(this.props.match.params.id, res => {
      this.setState({
        fail: res instanceof Error,
        loading: false,
        data: res.data[0]
      })
    })
  }

  buildBelow() {
    return (
      <div style={{ height: 300 }}>
        <div className="blurBackground" style={{ backgroundImage: `url(${this.state.data.cover})` }}>
        </div>
        <div className="headForeground">
          <img src={this.state.data.cover}></img>
          <div className="movieDetails">
            <div style={{ display: 'flex' }}>
              <Typography variant='h5' className="movieName" noWrap>{this.state.data.name}</Typography>
              <MovieRate mobile={true} rate={this.state.data.rating} />
            </div>
            <Typography variant='body1' className="movieAdditionInfo" noWrap>{this.state.data.nameFrn}</Typography>
            <div style={{ flex: 1 }}></div>
            <Typography variant='body2' className="movieAdditionInfo" noWrap>导演：{(this.state.data.directors ?? []).join(' / ')}</Typography>
            <Typography variant='body2' className="movieAdditionInfo" noWrap>主演：{(this.state.data.stars ?? []).join(' / ')}</Typography>
            <Typography variant='body2' className="movieAdditionInfo" noWrap>编剧：{(this.state.data.writers ?? []).join(' / ')}</Typography>
            <Typography variant='body2' className="movieAdditionInfo" noWrap>类型：{(this.state.data.types ?? []).join(' / ')}</Typography>
            <Typography variant='body2' className="movieAdditionInfo" noWrap>时长：{this.state.data.runtime}</Typography>
            <Typography variant='body2' className="movieAdditionInfo" noWrap>区域：{(this.state.data.country ?? []).join(' / ')}</Typography>
            <Typography variant='body2' className="movieAdditionInfo" noWrap>上映日期：{(this.state.data.releaseDate ?? []).join(' / ')}</Typography>
          </div>
        </div>
      </div>
    )
  }

  buildInfoLine(key, value) {
    return (
      <div style={{ margin: '8px 0' }}>
        <Typography color="textSecondary" variant="subtitle1" component="span">{key}</Typography>
        <Typography color="textPrimary" variant="body1" component="span">{value}</Typography>
      </div>
    )
  }

  buildInfoLink(key, value, link) {
    return (
      <div style={{ margin: '8px 0' }}>
        <Typography color="textSecondary" variant="subtitle1" component="span">{key}</Typography>
        <a href={link} target="_blank" style={{ textDecoration: 'none' }}>
          <Typography color="textPrimary" variant="body1" component="span">
            {value}
          </Typography>
        </a>
      </div>
    )
  }

  buildChild() {
    const item = this.state.data
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
          <Paper className="paper">
            <Typography variant="h6">影片信息</Typography>
            <div>
              {this.buildInfoLine('影片名称：', item.name ?? '')}
              {this.buildInfoLine('外文名称：', item.nameFrn ?? '')}
              {this.buildInfoLine('评分：', `${item.rating ?? 0} (${item.rateNum ?? 0}次)`)}
              {this.buildInfoLine('数据来源：', `${movieSourcesE2C[item.source ?? ''] ?? ''}`)}
              {this.buildInfoLine('导演：', (item.directors ?? []).join(' / '))}
              {this.buildInfoLine('主演：', (item.stars ?? []).join(' / '))}
              {this.buildInfoLine('编剧：', (item.writers ?? []).join(' / '))}
              {this.buildInfoLine('类型：', (item.types ?? []).join(' / '))}
              {this.buildInfoLine('区域：', (item.country ?? []).join(' / '))}
              {this.buildInfoLine('语言：', (item.language ?? []).join(' / '))}
              {item.imdb === undefined ? this.buildInfoLine('IMDb链接:', '') :
              this.buildInfoLink('IMDb链接：', `tt${item.imdb}`, `https://www.imdb.com/title/tt${item.imdb}/?ref_=nv_sr_srsg_0`)}
              <br></br>
              {this.buildInfoLine('简介：', item.summary ?? '')}
            </div>
          </Paper>
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
        <SubTopBar below={this.buildBelow()}>
          {this.buildChild()}
        </SubTopBar>
      </>
    );
  }
}

export default withRouter(DetailPage);
