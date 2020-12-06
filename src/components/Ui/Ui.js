import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux';
import Header from './Header/Header';
import Board from "./Board/Board";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Modal from "./Modal/Modal";
import Score from "./Score/Score";
import Refresh from '@material-ui/icons/Refresh';
import List from '@material-ui/icons/Menu';

class Ui extends Component {
    constructor(props) {
        super(props);
        this.winner = this.winner.bind(this);
        this.state = {
            board: <Board size={props.size} won={this.winner} key="1"/>,
            open: false,
            score: false,
            text: ''
        }
    }

    winner = text => {
        this.setState({
            open: true,
            text: text
        })
    };

    resetGame = () => {
        const value = Math.random().toString(36).substring(7);
        this.setState({
            board: <Board size={this.props.size} won={this.winner} key={value}/>
        })
    };

    showScore = () => {
        this.setState({
            score: true
        })
    };
    handleClose = () => {
        this.setState({open: false});
        this.resetGame();
    };

    closeScore = () => {
        this.setState({score: false});
    };

    clearScore = () => {
        localStorage.setItem('DRAWS',0);
        localStorage.setItem('WONS',0);
        localStorage.setItem('LOSS',0);
        this.setState({score: false});
        this.setState({score: true});
    };

    render() {
        return (
            <Aux>
                <Header/>
                {this.state.board}
                <Grid container justify='center' spacing={24} className="Grid">
                    <Grid item>
                        <Button
                            onClick={this.resetGame}
                            variant="raised"
                            color="default">
                            <Refresh style={{color:'#000000'}}/>
                            پاکسازی
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={this.showScore}
                            variant="raised"
                            color="default">
                            <List style={{color:'#000000'}}/>
                            جدول
                        </Button>
                    </Grid>
                </Grid>
                <Modal
                    text={this.state.text}
                    open={this.state.open}
                    onClose={this.handleClose}/>
                <Score
                    open={this.state.score}
                    onClose={this.closeScore}
                    clearScore={this.clearScore}
                />
            </Aux>
        )
    }
}

Ui.propTypes = {
  size: PropTypes.number
};

export default Ui;
