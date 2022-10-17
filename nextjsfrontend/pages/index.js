import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/header";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { gql } from "@apollo/client";
import client from "./api/apollo-client";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  example: {
    color: "#ccc",
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0",
    border: "1px solid green"
  },
  cardMedia: {
    paddingTop: "140%",
  },
}));

function Home({ actor }) {
  const classes = useStyles();

  return (
    <>
      <Header data={actor} />
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={1}>
            {actor.map((act) => (
              <Link key={act.id} href={`actor/${encodeURIComponent(act.id)}`}>
                <Grid item xs={6} sm={4} md={3}>
                  <Card className={classes.card} elevation={0}>
                    <CardContent>
                      <Box component="p" fontSize={16} fontWeight={900}>
                       Name :  {act.name}
                      </Box>
                      <Typography gutterBottom component="p">
                        Height :{act.height}
                      </Typography>
                      <Typography gutterBottom component="p">
                        Mass :{act.mass}
                      </Typography>
                      <Typography gutterBottom component="p">
                        Gender :{act.gender}
                      </Typography>
                      <Typography gutterBottom fontSize={12}>
                        Homeworld :{act.homeworld}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Link>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}

export async function getStaticProps() {

  const actor = await client.query({
    query: gql`
    query Actor{
      actors{
        id
        name
        height
        mass
        gender
        homeworld
      }
    }

    `,
  });


  return {
    props: {
      actor: actor.data.actors,
    },
  };
}

export default Home;
