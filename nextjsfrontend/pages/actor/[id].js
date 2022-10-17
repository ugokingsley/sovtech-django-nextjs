import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/header";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import { gql } from "@apollo/client";
import client from "../api/apollo-client";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    borderRadius: "0",
  },
  paperImagePreview:{
    paddingTop: 30
  },
  paperImage: {
    padding: theme.spacing(0),
    borderRadius: "0",
    marginLeft: 25,
    ["@media (max-width:600px)"]: {
      marginLeft: -20,
      marginRight: -20,
    },
  },
  paperRight: {
    padding: theme.spacing(0),
    borderRadius: "0",
    paddingLeft: 40,
    paddingTop: 30,
    ["@media (max-width:600px)"]: {
      paddingLeft: 0,
      paddingTop: 10,
    },
  },
  img: {
    maxWidth: "100%",
  },
}));

function Detail({actor}) {
  const classes = useStyles();
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {console.log(actor)}
      <Head>
        <title>{actor.name}</title>
      </Head>
      <Header data={actor}/>
      <Container maxWidth="md">
        <Grid container spacing={0}>
          <Grid item xs={12} sm={5}>
            <Paper className={classes.paperRight} elevation={0}>
              <Box component="h1" fontSize={18} fontWeight="400">
                {actor.name}
              </Box>
              <Box component="p" fontSize={22} fontWeight="900" m={0}>
                {actor}
              </Box>
              <Box component="p" m={0} fontSize={14}>
                Free Delivery & Returns (Ts&Cs apply)
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export async function getStaticPaths(){
  return{
    paths: [{params: { id: "1000" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {

const ACTOR_DATA = gql`
  query ($id: String!){
    actorsById(id: $id){
      id
      name
      height
      mass
      homeworld
    }
  }
`;

  const id = params.id;
  const { data } = await client.query({
    query: ACTOR_DATA,
    variables: { id },
  })


  return{
    props: {
      actor: data.actorsById,
    },
  };

}

export default Detail;
