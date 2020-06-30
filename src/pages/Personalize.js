import React from "react";
import TopBar from "../components/TopBar";
import NextIcon from "@material-ui/icons/NavigateNext";
import PrevIcon from "@material-ui/icons/NavigateBefore";
import DoneIcon from "@material-ui/icons/Done";
import {
  Typography,
  Card,
  CardActions,
  Button,
  CardContent,
  LinearProgress,
  Grid,
} from "@material-ui/core";
import cookie from "react-cookies";
import { personalize } from "../api/api";
import {
  personalizeTags,
  personalizeTagsE2C,
  defaultPersonalizeQues,
} from "../api/data";
import SelectableButton from "../components/SelectableButton";
import { withRouter } from "react-router";

class Personalize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curStep: 0,
      totalSteps: 4,
      loading: false,
      data: [[], [], [], [], []],
      ques: defaultPersonalizeQues,
    };

    this.buildChild = this.buildChild.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.handleStep = this.handleStep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.buildCheckBoxArea = this.buildCheckBoxArea.bind(this);
  }

  componentDidMount() {
    personalizeTags.forEach((v) => cookie.remove(v,
      {path: '/'}));
  }

  setLoading(b) {
    this.setState({
      loading: b,
    });
  }

  buildLoginPage() {
    return (
      <div>
        <Typography variant="body1" color="textSecondary">
          请登录后操作
        </Typography>
      </div>
    );
  }

  buildCheckBoxArea() {
    const curStep = this.state.curStep;

    if (curStep === 0 || Object.keys(this.state.ques[curStep]).length === 0) {
      return <></>;
    }

    const handleToggle = (value) => {
      this.setState((state, props) => {
        const newData = state.data.map((v, i) => {
          if (i === curStep) {
            if (v.indexOf(value) !== -1) {
              const tmp = [];
              v.forEach((d) => {
                if (d !== value) {
                  tmp.push(d);
                }
              });
              return tmp;
            } else {
              return [value, ...v];
            }
          } else {
            return v;
          }
        });

        return {
          data: newData,
        };
      });
    };

    const listItems = this.state.ques[curStep].options.map((item) => {
      if (curStep !== 4) {
        return (
          <Grid key={item._id} item xs={6} sm={4} md={3} lg={2} xl={2}>
            <SelectableButton
              text={item._id}
              onClick={() => handleToggle(item._id)}
              checked={this.state.data[curStep].indexOf(item._id) !== -1}
            />
          </Grid>
        );
      } else {
        // 电影列表
        return (
          <Grid key={item.movieId} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <SelectableButton
              text={item.name}
              background={item.cover}
              onClick={() => handleToggle(item.movieId)}
              checked={this.state.data[curStep].indexOf(item.movieId) !== -1}
            />
          </Grid>
        );
      }
    });

    return (
      <Grid container spacing={3} justify="space-between">
        {listItems}
      </Grid>
    );
  }

  handleStep(v) {
    if (v === 1) {
      // 储存当前所选结果
      if (this.state.curStep !== 0) {
        if (this.state.data[this.state.curStep].length === 0) {
          alert('请至少选择一项')
          return
        }
        cookie.save(
          personalizeTags[this.state.curStep - 1],
          this.state.data[this.state.curStep].join(","),
          {path: '/'}
        );
      }

      this.setLoading(true);
      // 请求下一组问题
      personalize((res) => {
        this.setLoading(false);

        this.setState((state, props) => {
          const oldQues = state.ques;
          oldQues[state.curStep + v] = {
            title: personalizeTagsE2C[state.curStep + v - 1],
            content: "",
            options: res.result,
          };
          return {
            ques: oldQues,
            curStep: state.curStep + v,
          };
        });
      });
    } else {
      // 恢复上一个问题
      cookie.remove(personalizeTags[this.state.curStep - 1],
        {path: '/'});

      this.setState((state, props) => {
        const oldData = state.data;
        oldData[state.curStep] = [];
        return {
          data: oldData,
          curStep: state.curStep + v,
        };
      });
    }
  }

  handleSubmit() {
    if (this.state.data[this.state.curStep].length === 0) {
      alert('请至少选择一项')
      return
    }
    cookie.save(
      personalizeTags[this.state.curStep - 1],
      this.state.data[this.state.curStep].join(","),
      {path: '/'}
    );
    this.setLoading(true)
    
    personalize((res) => {
      if (res.success) {
        alert('提交成功')
        this.props.history.replace("/")
      } else {
        alert('提交失败\n' + res.err)
      }
      this.setLoading(false);
    });

  }

  buildChild() {
    const curStep = this.state.curStep;
    const ques = this.state.ques[curStep];

    return (
      <Card>
        <LinearProgress
          variant="determinate"
          value={(100 * this.state.curStep) / this.state.totalSteps}
          color="secondary"
          style={{ backgroundColor: "transparent" }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {ques.title}
          </Typography>
          {ques.content && (
            <Typography variant="body1">{ques.content}</Typography>
          )}
          <div style={{ height: 16 }}></div>
          {this.buildCheckBoxArea()}
        </CardContent>
        <CardActions>
          <div style={{ flex: 1 }}></div>
          <Button
            variant="contained"
            color="default"
            onClick={() => this.handleStep(-1)}
            startIcon={<PrevIcon />}
            disabled={this.state.curStep === 0 || this.state.loading}
          >
            上一项
          </Button>
          {this.state.curStep === this.state.totalSteps ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.handleSubmit()}
              endIcon={<DoneIcon />}
              disabled={this.state.loading}
            >
              提交
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleStep(1)}
              endIcon={<NextIcon />}
              disabled={this.state.loading}
            >
              下一项
            </Button>
          )}
        </CardActions>
      </Card>
    );
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

export default withRouter(Personalize);