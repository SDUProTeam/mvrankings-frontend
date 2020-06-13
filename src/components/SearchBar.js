import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import RestoreOutlinedIcon from "@material-ui/icons/RestoreOutlined";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";

import "./SearchBar.css";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const movieSources = ["任意", "豆瓣", "猫眼", "时光网"];

const movieCountries = ["任意", "中国大陆", "港澳台", "日本", "韩国", "美国"];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  input: {
    width: "100%",
    textAlign: "center",
  },
  select: {
    width: "100%",
  },
  slider: {
    marginTop: "auto",
  },
}));

function SearchBarMovieName(props) {
  const classes = useStyles();

  const handleChange = (e) => {
    props.update("name", e.target.value);
  };

  return (
    <>
      <Typography gutterBottom>电影名称</Typography>
      <TextField
        id="movie-name"
        placeholder="电影名称"
        color="primary"
        onChange={handleChange}
        className={classes.input}
        value={props.data.name}
        disabled={props.disabled}
      />
    </>
  );
}

function SearchBarMovieRate(props) {
  const classes = useStyles();
  const value = [props.data.rate_min, props.data.rate_max];

  const setValue = (v) => {
    props.update("rate", v);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputMinChange = (event) => {
    setValue([
      event.target.value === "" ? "" : Number(event.target.value),
      value[1],
    ]);
  };

  const handleInputMaxChange = (event) => {
    setValue([
      value[0],
      event.target.value === "" ? "" : Number(event.target.value),
    ]);
  };

  const handleBlur = () => {
    const vmin = Math.max(0, value[0]);
    const vmax = Math.min(10, value[1]);
    setValue([vmin, vmax]);
  };

  const valuetext = (v) => v;

  return (
    <>
      <Typography id="range-slider" gutterBottom>
        评分
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Input
            value={value[0]}
            margin="dense"
            onChange={handleInputMinChange}
            onBlur={handleBlur}
            disabled={props.disabled}
            inputProps={{
              className: "range-input",
              step: 0.1,
              min: 0,
              max: 10,
              type: "number",
              "aria-labelledby": "range-slider",
            }}
          />
        </Grid>
        <Grid item xs>
          <Slider
            className={classes.slider}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            disabled={props.disabled}
            step={0.1}
            min={0}
            max={10}
          />
        </Grid>
        <Grid item>
          <Input
            value={value[1]}
            margin="dense"
            onChange={handleInputMaxChange}
            onBlur={handleBlur}
            disabled={props.disabled}
            inputProps={{
              className: "range-input",
              step: 0.1,
              min: 0,
              max: 10,
              type: "number",
              "aria-labelledby": "range-slider",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

function SearchBarMovieTime(props) {
  const step = 5;
  const minTime = 1895;
  const maxTime = new Date().getFullYear() + 5;

  const classes = useStyles();

  const value = [props.data.time_min, props.data.time_max];

  const setValue = (v) => {
    props.update("time", v);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputMinChange = (event) => {
    setValue([
      event.target.value === "" ? minTime : Number(event.target.value),
      value[1],
    ]);
  };

  const handleInputMaxChange = (event) => {
    setValue([
      value[0],
      event.target.value === "" ? maxTime : Number(event.target.value),
    ]);
  };

  const handleBlur = () => {
    const vmin = Math.max(minTime, value[0]);
    const vmax = Math.min(maxTime, value[1]);
    setValue([vmin, vmax]);
  };

  const valuetext = (v) => v;

  return (
    <>
      <Typography gutterBottom>上映年份</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Input
            value={value[0]}
            margin="dense"
            onChange={handleInputMinChange}
            onBlur={handleBlur}
            disabled={props.disabled}
            inputProps={{
              className: "range-input",
              step: step,
              min: minTime,
              max: maxTime,
              type: "number",
              "aria-labelledby": "range-slider",
            }}
          />
        </Grid>
        <Grid item xs>
          <Slider
            className={classes.slider}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            disabled={props.disabled}
            step={step}
            min={minTime}
            max={maxTime}
          />
        </Grid>
        <Grid item>
          <Input
            value={value[1]}
            margin="dense"
            onChange={handleInputMaxChange}
            onBlur={handleBlur}
            disabled={props.disabled}
            inputProps={{
              className: "range-input",
              step: step,
              min: minTime,
              max: maxTime,
              type: "number",
              "aria-labelledby": "range-slider",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

function SearchBarMovieStars(props) {
  const classes = useStyles();

  const handleChange = (e) => {
    props.update("stars", e.target.value);
  };

  return (
    <>
      <Typography gutterBottom>主演</Typography>
      <TextField
        id="movie-stars"
        placeholder="主演"
        color="primary"
        onChange={handleChange}
        className={classes.input}
        value={props.data.stars}
        disabled={props.disabled}
      />
    </>
  );
}

function SearchBarMovieDirector(props) {
  const classes = useStyles();

  const handleChange = (e) => {
    props.update("directors", e.target.value);
  };

  return (
    <>
      <Typography gutterBottom>导演</Typography>
      <TextField
        id="movie-directos"
        placeholder="导演"
        color="primary"
        onChange={handleChange}
        className={classes.input}
        value={props.data.directors}
        disabled={props.disabled}
      />
    </>
  );
}

function SearchBarMovieSource(props) {
  const classes = useStyles();
  const source = props.data.source;

  const handleChange = (e) => {
    props.update("source", e.target.value);
  };

  return (
    <>
      <Typography gutterBottom>来源</Typography>
      <Select
        className={classes.select}
        id="movie-source"
        value={source}
        onChange={handleChange}
        disabled={props.disabled}
        input={<BootstrapInput />}
      >
        {movieSources.map((s) => (
          <MenuItem value={s} key={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

function SearchBarMovieWriters(props) {
  const classes = useStyles();

  const handleChange = (e) => {
    props.update("writers", e.target.value);
  };

  return (
    <>
      <Typography gutterBottom>编剧</Typography>
      <TextField
        id="movie-writers"
        placeholder="编剧"
        color="primary"
        onChange={handleChange}
        className={classes.input}
        value={props.data.writers}
        disabled={props.disabled}
      />
    </>
  );
}

function SearchBarMovieCountry(props) {
  const classes = useStyles();
  const country = props.data.country;

  const handleChange = (e) => {
    props.update("country", e.target.value);
  };

  return (
    <>
      <Typography gutterBottom>国家/地区</Typography>
      <Select
        className={classes.select}
        id="movie-country"
        value={country}
        onChange={handleChange}
        disabled={props.disabled}
        input={<BootstrapInput />}
      >
        {movieCountries.map((s) => (
          <MenuItem value={s} key={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

function SearchExpansionPanel(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="searchbar-content"
          id="searchbar-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>按条件筛选</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <form noValidate autoComplete="off" style={{ width: "100%" }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <SearchBarMovieName
                  data={props.data}
                  update={props.update}
                  disabled={props.loading}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <SearchBarMovieRate
                  data={props.data}
                  update={props.update}
                  disabled={props.loading}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <SearchBarMovieTime
                  data={props.data}
                  update={props.update}
                  disabled={props.loading}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <SearchBarMovieStars
                  data={props.data}
                  update={props.update}
                  disabled={props.loading}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <SearchBarMovieDirector
                  data={props.data}
                  update={props.update}
                  disabled={props.loading}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <SearchBarMovieWriters
                  data={props.data}
                  update={props.update}
                  disabled={props.loading}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <SearchBarMovieCountry
                  data={props.data}
                  update={props.update}
                  disabled={props.loading}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <SearchBarMovieSource
                  data={props.data}
                  update={props.update}
                  disabled={props.loading}
                />
              </Grid>
            </Grid>
          </form>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            startIcon={<RestoreOutlinedIcon />}
            onClick={props.reset}
            disabled={props.loading}
          >
            重置
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            startIcon={<SearchOutlinedIcon />}
            onClick={props.submit}
            disabled={props.loading}
          >
            查询
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handleSubmit: this.props.handleSubmit ?? this.handleSubmit,
    };
  }

  handleSearchSubmit() {
    const minRate = 0;
    const maxRate = 10;
    const minTime = 1895;
    const maxTime = new Date().getFullYear() + 5;
    const tmpData = this.props.searchData;
    // 预处理数据
    // Rate:
    const rate = [
      Math.min(tmpData.rate_min, tmpData.rate_max),
      Math.max(tmpData.rate_min, tmpData.rate_max),
    ];
    tmpData.rate_min = Math.min(maxRate, Math.max(minRate, rate[0]));
    tmpData.rate_max = Math.min(maxRate, Math.max(minRate, rate[1]));

    // Time:
    const time = [
      Math.min(tmpData.time_min, tmpData.time_max),
      Math.max(tmpData.time_min, tmpData.time_max),
    ];
    tmpData.time_min = Math.min(maxTime, Math.max(minTime, time[0]));
    tmpData.time_max = Math.min(maxTime, Math.max(minTime, time[1]));

    this.props.update(tmpData);
    this.props.doSearch(tmpData);
  }

  handleSearchReset() {
    this.props.update({
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
    });
  }

  handleSearchUpdate(key, value) {
    let tmpData = this.props.searchData;

    switch (key) {
      case "name":
        tmpData.name = value;
        break;
      case "rate":
        tmpData.rate_min = value[0];
        tmpData.rate_max = value[1];
        break;
      case "time":
        tmpData.time_min = value[0];
        tmpData.time_max = value[1];
        break;
      case "directors":
        tmpData.directors = value;
        break;
      case "stars":
        tmpData.stars = value;
        break;
      case "source":
        tmpData.source = value;
        break;
      case "writers":
        tmpData.writers = value;
        break;
      case "country":
        tmpData.country = value;
        break;
      default:
        break;
    }

    this.props.update(tmpData);
  }

  render() {
    return (
      <SearchExpansionPanel
        reset={this.handleSearchReset.bind(this)}
        submit={this.handleSearchSubmit.bind(this)}
        update={this.handleSearchUpdate.bind(this)}
        data={this.props.searchData}
        loading={this.props.loading}
      />
    );
  }
}
