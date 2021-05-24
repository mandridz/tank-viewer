import './App.css';
import React from 'react';
import WsClient from './WsClient';
import TankPanel from './TankPanel';
import { ThemeProvider, withStyles } from "@material-ui/styles";

import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#f2a33a'
    },
    secondary: {
      main: '#666'
    },
  },
});

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    margin: 10,
    width: 250,
    height: 250,
  },
  card: {
    border: "none",
    boxShadow: "none",
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginTop: 12,
    textAlign: 'left',
  },
  action: {
    justifyContent: 'center',
  },
  value: {
    color: '#3fd6db',
    fontSize: 20,
  }
});

class App  extends React.Component {
  constructor(props){
    super(props);
    this.wsClient = React.createRef();
    this.state = {
      serialData : {}
    }
  }

  updateSerialData = (_serialData) => {
    this.setState({ serialData: _serialData });
  }

  handlePumpStatusChange = (pumpId) => {
    this.wsClient.current.sendMessasgeToPump(pumpId);

    this.wsClient.current.sendRefreshMessage();
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <WsClient
           ref={this.wsClient}
          wsurl="ws://10.0.3.3:8080/TankDriver/ws"
          interval="10000"
          updateSerialData={this.updateSerialData}
        />
        <ThemeProvider theme={theme}>
          <div className="App">
            <header className="App-header">
              <p>Дренажная и канализационная система</p>
            </header>
            <div className={classes.root}>
              <TankPanel
                id="0"
                name="Канализационный коллектор #1"
                classes={classes} serialData={this.state.serialData}
                handlePumpStatusChange={this.handlePumpStatusChange}
              />
              <TankPanel
                id="1"
                name="Канализационный коллектор #2"
                classes={classes}
                serialData={this.state.serialData}
                handlePumpStatusChange={this.handlePumpStatusChange}
              />
              <TankPanel
                id="2"
                name="Канализационный коллектор #3"
                classes={classes}
                serialData={this.state.serialData}
                handlePumpStatusChange={this.handlePumpStatusChange}
              />
              <TankPanel
                id="3"
                name="Дренажный коллектор #1"
                classes={classes}
                serialData={this.state.serialData}
                handlePumpStatusChange={this.handlePumpStatusChange}
              />
              <TankPanel
                id="4"
                name="Дренажный коллектор #2"
                classes={classes}
                serialData={this.state.serialData}
                handlePumpStatusChange={this.handlePumpStatusChange}
              />
            </div>
          </div>
        </ThemeProvider>
      </>
    );
  }
}

export default withStyles(styles)(App);
