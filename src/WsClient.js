import React from 'react';

class WsClient extends React.Component {

  componentDidMount() {
    this.connection = new WebSocket(this.props.wsurl);

    this.connection.onopen = () => {
      console.log('Connected...');
    };

    // listen to onmessage event
    this.connection.onmessage = evt => {
      this.props.updateSerialData(JSON.parse(evt.data));

      console.log('Message received');
    };

    this.connection.onclose = () => {
      console.log('Disconnected.');
    }

    this.connection.onerror = err => {
      console.log('Error: ' + err.data);
    };

    setInterval( _ =>{
        this.connection.send('REFRESH');
    }, this.props.interval);
  }

  sendRefreshMessage() {
    this.connection.send('REFRESH'); 
  };

  sendMessasgeToPump(id) {
    this.connection.send(id);
  }

  render() {

    return  null;
  }

};

export default WsClient;
