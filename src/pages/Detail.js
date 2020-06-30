import React from "react";
import { withRouter, Link } from "react-router-dom";
import { SubTopBar } from "../components/TopBar";
import { movieDetail, recommendMovies } from "../api/api";
import "./Detail.css";
import {
  Typography,
  Grid,
  Paper,
  Divider,
  CircularProgress,
  makeStyles,
  Card,
  CardActionArea,
} from "@material-ui/core";
import { Rating } from '@material-ui/lab'
import MovieRate from "../components/MovieRate";
import { movieSourcesE2C } from '../api/data'

const useStyles = makeStyles((theme) => ({
  recItemRoot: {
    marginTop: 16
  },
  recItem: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 16,
  },
  recItemCover: {
    width: 80,
    height: 100,
    borderRadius: 4
  },
  recItemName: {
    padding: '0 8px'
  }
}))

function RecommendItem(props) {
  const classes = useStyles()

  return (
      <Card className={classes.recItemRoot}>
        <CardActionArea>
          <Link to={'/detail/' + props.item.movieId} style={{ textDecoration: 'none' }}>
            <div className={classes.recItem}>
              <img className={classes.recItemCover} src={props.item.cover} alt={props.item.name}></img>
              <div style={{ maxWidth: 'calc(100% - 80px - 30px)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Typography variant="subtitle1" className={classes.recItemName} color="textPrimary" noWrap>{props.item.name}</Typography>
                <Typography variant="body2" className={classes.recItemName} color="textSecondary" noWrap>{(props.item.types ?? []).join(' / ')}</Typography>
              </div>

              <MovieRate rate={props.item.rating} mobile={true}/>
            </div>
          </Link>
        </CardActionArea>
      </Card>
  )
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fail: false,
      loading: true,
      data: {},
      recommend: undefined
    };

    this.buildChild = this.buildChild.bind(this);
    this.buildRecommend = this.buildRecommend.bind(this)
  }

  componentDidMount() {
    // Get detail
    movieDetail(this.props.match.params.id, (res) => {
      this.setState({
        fail: res.err !== undefined,
        loading: false,
        data: this.preHandleData(res.data ?? {}),
      });

      // 开始获取影片推荐
      recommendMovies(res => {
        if (!res.rec) {
          this.setState({
            recommend: []
          })
        } else {
          this.setState({
            recommend: res.rec
          })
        }
      })
    });
  }

  preHandleData(data) {
    const tmp = { ...data };
    if (tmp.runtime && (tmp.runtime + "").match("[0-9]*[0-9]$")) {
      tmp.runtime = tmp.runtime + "分钟";
    }
    return tmp;
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
        <div style={{ display: "flex" }}>
          <Typography
            className="info-key"
            color="textSecondary"
            variant="subtitle1"
            component="span"
          >
            {key}
          </Typography>
          <Typography
            className="info-value"
            color="textPrimary"
            variant="body1"
            component="span"
          >
            {value.split('\n').map((line, i) => (<Typography key={`rating-${i}`} component="p" variant="body1">{line}</Typography>))}
          </Typography>
        </div>
      </Grid>
    );
  }

  buildInfoLink(key, value, link) {
    return (
      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <div style={{ display: "flex" }}>
          <Typography
            className="info-key"
            color="textSecondary"
            variant="subtitle1"
            component="span"
          >
            {key}
          </Typography>
          <Typography
            className="info-value"
            color="textPrimary"
            variant="body1"
            component="span"
          >
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
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
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Grid container spacing={4}>
          {child}
        </Grid>
      </Grid>
    );
  }

  buildSubInfoBlock(title, text) {
    return (
      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <div>
          <Typography variant="subtitle1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {text}
          </Typography>
        </div>
      </Grid>
    );
  }

  buildCommentBlock(item, idx) {
    const {user, time, content, rating} = item
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={'comment-' + idx}>
        <div>
          <Typography variant="subtitle1" component="span" gutterBottom>
            {user}
          </Typography>
          <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
            <Rating precision={0.1} size="small" value={rating / 2} readOnly/>
            <div style={{ width: 8 }}></div>
            <Typography variant="subtitle2" component="span" color="textSecondary">
              {time.split(' ')[0]}
            </Typography>
          </div>
          
          <Typography variant="body1" color="textSecondary">
            {content}
          </Typography>
        </div>
      </Grid>
    );
  }

  buildRecommendLoading() {
    return (
      <div style={{ textAlign: 'center', padding: 16 }}>
        <CircularProgress />
        <Typography variant="body1" color="textSecondary">正在加载</Typography>
      </div>
    )
  }

  buildRecommend() {
    if ((this.state.recommend ?? []).length === 0) {
      return this.buildRecommendEmpty()
    }
    return this.state.recommend.map(h => (
        <div className="rec-item"  key={'rec-' + h.movieId}>
            <RecommendItem item={h}/>
        </div>
    ))
  }

  buildRecommendEmpty() {
    return (
      <div style={{ textAlign: 'center', padding: 16 }}>
        <Typography variant="body1" color="textSecondary">无影片推荐</Typography>
      </div>
    )
  }

  buildChild() {
    const item = this.state.data;
    return (
      <Grid className="container" container spacing={4}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
          <Grid container spacing={4}>
            {this.buildInfoBlock(
              "影片简介",
              <Grid item>
                <Typography color="textSecondary" variant="body1" component="p">
                  {item.summary}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {this.buildInfoBlock(
              "影片信息",
              <>
                {this.buildInfoLine("影片名称", item.name ?? "")}
                {this.buildInfoLine("外文名称", item.nameFrn ?? "")}
                {this.buildInfoLine(
                  "评分",
                  Object.keys(item?.source ?? {}).map(k => {
                    const src = item.source[k]
                    return `${movieSourcesE2C[k]}：${src.rating ?? '暂无评分'} (${src.rateNum ?? 0}次)`
                  }).join('\n')
                )}
                {this.buildInfoLine("类型", (item.types ?? []).join(" / "))}
                {this.buildInfoLine("区域", (item.country ?? []).join(" / "))}
                {this.buildInfoLine("片长", item.runtime ?? "")}
                {this.buildInfoLine(
                  "上映日期",
                  (item.releaseDate ?? []).join(" / ")
                )}
                {this.buildInfoLine("语言", (item.language ?? []).join(" / "))}
                {item.imdb === undefined
                  ? this.buildInfoLine("IMDb链接", "")
                  : this.buildInfoLink(
                      "IMDb链接",
                      `tt${item.imdb}`,
                      `https://www.imdb.com/title/tt${item.imdb}/?ref_=nv_sr_srsg_0`
                    )}
              </>
            )}
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {this.buildInfoBlock(
              "演职人员",
              <>
                {this.buildSubInfoBlock("主演", (item.stars ?? []).join(" / "))}
                {this.buildSubInfoBlock(
                  "导演",
                  (item.directors ?? []).join(" / ")
                )}
                {this.buildSubInfoBlock(
                  "编剧",
                  (item.writers ?? []).join(" / ")
                )}
              </>
            )}
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {this.buildInfoBlock(
              "评论",
              <>
                {item.comments
                  ? (item.comments.length === 0
                      ? this.buildInfoLine("没有评论", "")
                      : (item.comments instanceof Array ? item.comments.map((c, idx) => this.buildCommentBlock(c, idx)) : this.buildCommentBlock(item.comments, 0)))
                  : <></>}
              </>
            )}
            <Grid item xs={12}>
              <div style={{ height: 20 }}></div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
          <Paper className="paper">
            <Typography variant="h6">影片推荐</Typography>
            { this.state.recommend === undefined ? this.buildRecommendLoading() : this.buildRecommend() }
          </Paper>
        </Grid>
      </Grid>
    );
  }

  buildFailPage() {
    return (
      <SubTopBar loginState={this.props.loginState}>
        <Typography variant="h4" component="div" style={{ textAlign: 'center' }}>发生了某种错误</Typography>
      </SubTopBar>
    )
  }

  render() {
    return (
      <>
        {this.state.fail ? this.buildFailPage() : (<SubTopBar below={this.buildBelow()} loginState={this.props.loginState}>{this.buildChild()}</SubTopBar>)}
      </>
    );
  }
}

export default withRouter(DetailPage);
