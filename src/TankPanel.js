import React from 'react';
import {
  Paper,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from "@material-ui/core";

class TankPanel  extends React.Component {

  handleClick = () => {
    this.props.handlePumpStatusChange(this.props.id);
  }

  render() {
    const { id } = this.props;
    const { classes } = this.props;
    const { serialData } = this.props;

    var sonarValue = 0;
    var currentValue = 0;
    var buttonColor = "secondary";
    var buttonCaption = "Включить";

    if (serialData.length) {
      sonarValue = serialData[id].sonarValue;
      currentValue = serialData[id].currentValue;
      buttonColor = serialData[id].tankStatus === 'ON' ? "primary" : "secondary";
      buttonCaption = serialData[id].tankStatus === 'ON' ? "Выключить" : "Включить"

    }

    return (
      <Paper className={classes.paper}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textPrimary">
              { this.props.name }
            </Typography>
            <br />
            <Typography className={classes.pos} color="textSecondary">
              Глубина: <span className={classes.value}>{sonarValue} m</span>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Ток насоса: <span className={classes.value}>{currentValue} A</span>
            </Typography>
          </CardContent>
          <CardActions className={classes.action}>
            <Button variant="contained" color={buttonColor} onClick={this.handleClick}>
              { buttonCaption }
            </Button>
          </CardActions>
        </Card>
      </Paper>
    );
  }
}

export default TankPanel;
