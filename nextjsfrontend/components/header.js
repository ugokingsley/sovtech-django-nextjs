import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Container } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "next/link";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbarDesktop: {
    backgroundColor: "#f8f8f8",
    color: "#fff",
  },
  appbarMain: {
    backgroundColor: "#2d2d2d",
  },
  appbarSecondary: {
    backgroundColor: "#525050",
    color: "#fff",
  },
  appbarPromotion: {
    backgroundColor: "#2d2d2d",
    color: "#fff",
    margin: theme.spacing(0, 0, 8),
    ["@media (max-width:600px)"]: {
      margin: theme.spacing(0, 0, 2),
    },
  },
  toolbarDesktop: {
    padding: "0px",
    minHeight: 30,
  },
  toolbarMain: {
    padding: "0px",
    minHeight: 60,
  },
  toolbarSecondary: {
    padding: "0px",
    minHeight: 50,
  },
  toolbarPromotion: {
    padding: "0px",
    minHeight: 50,
  },
  svg: {
    fill: "#fff",
  },
  menuList: {
    display: "flex",
    flexDirection: "row",
    padding: "0"
  },
  menuListItem: {
    padding: 0,
    paddingRight: 20,
    textTransform: "capitalize",
  },
  listItemLink: {
    fontSize: 13,
    color: "#fff",
    textDecoration: "none"
  }
}));

export default function Header({data}) {


  const classes = useStyles();

  return (
    <nav>
      {console.log(data)}
      <AppBar
        position="relative"
        elevation={0}
        className={classes.appbarDesktop}
      >
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbarDesktop}></Toolbar>
        </Container>
      </AppBar>
      <AppBar position="static" elevation={0} className={classes.appbarMain}>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbarMain}>
              <h2>SWAPI.DEV API</h2>
        </Toolbar>
        </Container>
      </AppBar>
      <AppBar
        position="relative"
        elevation={0}
        className={classes.appbarSecondary}
      >
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbarSecondary}>
            <List className={classes.menuList}>
              <ListItem>
                <Link href={`/}`}><a className={classes.listItemLink}>Home</a></Link>
              </ListItem>
            </List>
          </Toolbar>
        </Container>
      </AppBar>
      <AppBar
        position="relative"
        elevation={0}
        className={classes.appbarPromotion}
      >
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbarPromotion}></Toolbar>
        </Container>
      </AppBar>
    </nav>
  );
}
