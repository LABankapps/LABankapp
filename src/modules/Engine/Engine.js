import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";

import { engineActions } from '../../_actions';
import { Loading, AppCard, Search } from '../../_components';
import { setEngineInfo, theme } from '../../_helpers';

//Material-ui import
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

//material-ui-icons import
import NavigateNextIcon from 'material-ui-icons/NavigateNext';
import NavigateBeforeIcon from 'material-ui-icons/NavigateBefore';

const getEnginesInfo = (engines) => {
  let enginesInfo = [];
  engines.map((engine) => {
    return enginesInfo.push(setEngineInfo(engine));

  });
  return enginesInfo;
}

//styles
const styles = context => ({
  root: {
    padding: 20,
    marginTop: context.spacing.unit * 3,
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'auto',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

class Engine extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(engineActions.getAll());

    this.state = {
      data: [],
      page: 0,
      CardPerPage: 8,
      endpoint: "http://localhost:8000/"
    }
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => {
      this.setState({
        data: getEnginesInfo(data.engines)
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.items !== this.props.items && typeof nextProps.items !== 'undefined'){
      this.setState({
        data: getEnginesInfo(nextProps.items)
      });
    }
  }

  filtrerCard = (e) => {
    let searchKey = e.target.value.toString().toLowerCase();
    this.setState({
      data: getEnginesInfo(this.props.items).filter(card => Object.keys(card).some(key => key!== '_id' && key!== 'image' && card[key].toString().toLowerCase().match(new RegExp(searchKey, 'g'))))
    });

  }

  renderCards = (data, cards, totalPageCards)=>{
    return data.filter((value, key) => key >= cards -1 && key < totalPageCards)
  }

  handleNextPage = () =>{
    const { page, CardPerPage, data } = this.state;
    if((page + 1) * CardPerPage < data.length){
      this.setState((prevState) => ({
        page: prevState.page + 1
      }));
    }
  }

  handlePrevPage = () =>{
    const { page } = this.state;
    if((page - 1) >= 0){
      this.setState((prevState) => ({
        page: prevState.page - 1
      }));
    }
  }

  render() {
    let { loading, classes } = this.props;
    let { data, page, CardPerPage } = this.state;

    let totalPageCards = page * CardPerPage + Math.min(data.length - page * CardPerPage, CardPerPage);
    let cards = page * CardPerPage + 1;

    //width
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    const renderCards = this.renderCards;
    const handlePrevPage = this.handlePrevPage;
    const handleNextPage = this.handleNextPage;
    const filtrerCard = this.filtrerCard;
    return (
      <div>
        { loading &&
          <Loading mode="query"/>
        }
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={classes.toolbar} style={theme.getRowStyle('white', 'black')}>
                <Search style={{ color: '#757575', backgroundColor: '#FFFFFF', border: '1px solid #f9fbe7', borderRadius: '2px'}} filtrer={filtrerCard} placeholder={"Trouver une machine"}/>
                <div className={classes.toolbar}>
                  {
                    w > 550 &&
                    <Typography style={theme.getRowStyle('white', 'none')}>{cards}-{totalPageCards} sur {data.length}</Typography>
                  }
                  <IconButton style={theme.getRowStyle('white', 'none')} onClick={handlePrevPage}>
                    <NavigateBeforeIcon/>
                  </IconButton>
                  <IconButton style={theme.getRowStyle('white', 'none')} onClick={handleNextPage}>
                    <NavigateNextIcon/>
                  </IconButton>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} className={classes.center}>
              {
                data ?
                  <AppCard data={renderCards(data, cards, totalPageCards)}/> :
                  <CircularProgress />
              }
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

}

Engine.propTypes = {
  engines: PropTypes.array,
  loading: PropTypes.bool,
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { loading } = state.engines
    const { items } = typeof state.engines !== 'undefined' ? state.engines : { items: [] };
    return {
        items,
        loading
    };
}

const connectedEngine = connect(mapStateToProps)(Engine);
const connectedEngineWithStyles = withStyles(styles)(connectedEngine);
export { connectedEngineWithStyles as Engine };
