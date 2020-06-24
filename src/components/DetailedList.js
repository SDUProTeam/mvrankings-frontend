import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Button,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 1000,
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      maxHeight: "75vh",
    },
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  cell: {
    minWidth: 130,
  },
  movieSrc: {
    display: "inline-block",
    margin: 8,
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
}));

const headCells = [
  { id: "name", disablePadding: true, label: "电影名称", sort: false },
  { id: "rate_douban", disablePadding: false, label: "豆瓣评分", sort: true },
  { id: "rate_mtime", disablePadding: false, label: "时光网评分", sort: true },
  { id: "rate_maoyan", disablePadding: false, label: "猫眼评分", sort: true },
  { id: "time", disablePadding: false, label: "上映时间", sort: true },
  { id: "type", disablePadding: false, label: "类型", sort: false },
  { id: "stars", disablePadding: false, label: "主演", sort: false },
  { id: "directors", disablePadding: false, label: "导演", sort: false },
  { id: "source", disablePadding: false, label: "来源", sort: false },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy } = props;
  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) =>
          headCell.sort ? (
            <TableCell
              className={classes.cell}
              key={headCell.id}
              align={"center"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                style={{ fontWeight: "bold" }}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc" ? "降序" : "升序"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ) : (
            <TableCell
              className={classes.cell}
              key={headCell.id}
              align={"center"}
              padding={headCell.disablePadding ? "none" : "default"}
              style={{ fontWeight: "bold" }}
            >
              {headCell.label}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTable(props) {
  const classes = useStyles();
  const order = props.order;
  const orderBy = props.orderBy;

  const handleRequestSort = (event, property) => {
    let reqAsc = false;
    if (orderBy === property) {
      reqAsc = order === "desc";
    } else {
      // 默认降序
      reqAsc = false;
    }

    props.orderReq(property, reqAsc ? "asc" : "desc");
  };

  const rows = props.data?.data ?? [];

  const buildSrc = (src) => {
    const srcETC = {
      douban: "豆瓣",
      maoyan: "猫眼",
      mtime: "时光网",
    };
    return (
      <div style={{ display: "flex" }}>
        {Object.keys(src).map((k) => {
          return (
            <Button
              variant="contained"
              color="secondary"
              href={src[k].url}
              size="small"
              key={k + src[k].id}
              target="_blank"
            >
              {srcETC[k]}
            </Button>
            // <a className={classes.movieSrc} href={src[k].url} target="_blank" key={k + src[k].id}>{ srcETC[k] }</a>
          );
        })}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="table"
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length ?? 0}
            />
            <TableBody>
              {!props.loading
                ? rows.map((row, index) => {
                    return (
                      <TableRow hover tabIndex={-1} key={row.name}>
                        <TableCell
                          className={classes.cell}
                          scope="row"
                          align="center"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell className={classes.cell} align="center">
                          {row.source.douban?.rate ?? ""}
                        </TableCell>
                        <TableCell className={classes.cell} align="center">
                          {row.source.mtime?.rate ?? ""}
                        </TableCell>
                        <TableCell className={classes.cell} align="center">
                          {row.source.maoyan?.rate ?? ""}
                        </TableCell>
                        <TableCell className={classes.cell} align="center">
                          {row.time}
                        </TableCell>
                        <TableCell className={classes.cell} align="center">
                          {(row.type ?? []).join("/")}
                        </TableCell>
                        <TableCell className={classes.cell} align="center">
                          {(row.casts ?? []).join("/")}
                        </TableCell>
                        <TableCell className={classes.cell} align="center">
                          {(row.directors ?? []).join("/")}
                        </TableCell>
                        <TableCell className={classes.cell} align="center">
                          {buildSrc(row.source)}
                        </TableCell>
                      </TableRow>
                    );
                  })
                : [1, 2, 3, 4, 5].map((a) => {
                    return (
                      <TableRow tabIndex={-1} key={a}>
                        <TableCell className={classes.cell} align="center">
                          <Skeleton variant="text" animation="wave"></Skeleton>
                        </TableCell>
                        <TableCell className={classes.cell} align="center">
                          <Skeleton variant="text" animation="wave"></Skeleton>
                        </TableCell>
                        <TableCell className={classes.cell} align="center">
                          <Skeleton variant="text" animation="wave"></Skeleton>
                        </TableCell>
                        <TableCell className={classes.cell} align="center">
                          <Skeleton variant="text" animation="wave"></Skeleton>
                        </TableCell>
                        <TableCell className={classes.cell} align="center">
                          <Skeleton variant="text" animation="wave"></Skeleton>
                        </TableCell>
                        <TableCell className={classes.cell} align="center">
                          <Skeleton variant="text" animation="wave"></Skeleton>
                        </TableCell>
                        <TableCell className={classes.cell} align="center">
                          <Skeleton variant="text" animation="wave"></Skeleton>
                        </TableCell>
                        <TableCell className={classes.cell} align="center">
                          <Skeleton variant="text" animation="wave"></Skeleton>
                        </TableCell>
                        <TableCell className={classes.cell} align="center">
                          <Skeleton variant="text" animation="wave"></Skeleton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default function DetailedList(props) {
  return (
    <>
      <EnhancedTable {...props} />
    </>
  );
}
