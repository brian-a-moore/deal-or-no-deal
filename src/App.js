import React, { Component } from 'react';
import { cases, rounds } from './static';
import { shuffle, offer } from './helpers';
import numeral from 'numeral';
import _ from 'lodash';
import './style.css';

export default class App extends Component {
    state = {
        gameState: 'idle',
        case: null,
        cases: null,
        left: null,
        oldOffers: [],
        round: null,
        offer: null,
        message: null,
        lastThree: [],
        pickedCase: null
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.gameState !== this.state.gameState && this.state.round !== 10) {
            switch(this.state.gameState) {
                case 'accepted': return this.howDidYouDo();
                case 'round-ready': return this.startRound();
                case 'prepare-offer': return this.prepareOffer();
                case 'offer': return this.offer();
                case 'end': return this.end();
                case 'final': return this.finalChoice();
                case 'waiting': return this.waiting();
                default: return null;
            }
        }
        
        if(prevState.round !== this.state.round && this.state.round === 10) {
            if(this.state.round === 10) this.setState({ gameState: 'final', round: '10' });
        }
    }
    accept = () => {
        this.setState({
            gameState: 'accepted',
            message: `You accepted the offer for ${numeral(this.state.offer).format('$0,0')}!`
        });
    }
    buttonAction = v => {
        switch(this.state.gameState) {
            case 'pick': return this.selectYourCase(v);
            case 'round': return this.pickCase(v);
            default: return null;
        }
    }
    buttonsDisabled = () => {
        switch(this.state.gameState) {
            case 'pick': return false;
            case 'round': return false;
            default: return true;
        }      
    }
    decline = () => {
        let state = {...this.state};
        state.oldOffers.push(this.state.offer);
        state.offer = null;
        state.gameState = 'round-ready';
        state.message = `No deal! Alright, let's get back to it...`;
        state.left = rounds[state.round];
        state.pickedCase = null;
        state.round++;
        this.setState(state);
    }
    end = () => {
        let lastRound = this.state.round === 10;
        let diff = Math.abs(this.state.case.amount - this.state.offer);
        let message;
        if(lastRound) {
            if(this.state.case.amount >= this.state.offer) message = `Seems like you made a good deal! Your case is worth ${numeral(diff).format('$0,0')} more!!!`;
            else message = `I'm sorry, looks like you made a bad deal, you missed out on ${numeral(diff).format('$0,0')}...`;
        } else {
            if(this.state.case.amount <= this.state.offer) message = `Seems like you made a good deal! Your case was worth ${numeral(this.state.case.amount).format('$0,0')}. Your offer is worth ${numeral(diff).format('$0,0')} more!!!`;
            else message = `I'm sorry, looks like you made a bad deal, you missed out on ${numeral(diff).format('$0,0')}...`;
        }
        this.setState({ message, gameState: 'over' });
    }
    finalChoice = () => {
        this.setState({ message: `Alright, it's the last round, do you want to keep your case?` });
    }
    howDidYouDo = () => {
        setTimeout(() => this.setState({
            message: `Let's find out how you did...`,
            gameState: 'end'
        }), 1000);
    }
    keepYourCase = keep => {
        let lastCase = _.find(this.state.cases, c => { return c.available && c.number !== this.state.case.number });
        this.setState({
            gameState: 'kept',
            case: keep ? this.state.case : lastCase,
            offer: keep ? lastCase.amount : this.state.case.amount,
            message: `You decided to ${keep ? 'keep your case, let\'s find out how lucky it was!' : 'switch your case, but was that the right decision?' }`
        });
    }
    messageClasses = () => {
        if(this.state.gameState === 'offer-pending') return 'offer';
        else if(this.state.gameState === 'round-ready') {
            if(this.state.pickedCase) {
                if(this.state.pickedCase.amount >= 100000) return 'bad';
                else return 'good';
            }
            else return 'neutral';
        }
        else if(this.state.gameState === 'end' || this.state.gameState === 'over') {
            let lastRound = this.state.round === 10;
            if(lastRound) {
                if(this.state.case.amount >= this.state.offer) return 'good';
                else return 'bad';
            } else {
                if(this.state.case.amount >= this.state.offer) return 'bad';
                else return 'good';               
            }
        }
        else return 'neutral';
    }
    offer = () => {
        let yourOffer = offer(this.state.lastThree, this.state.cases);
        setTimeout(() => this.setState({
            message: `Okay, so the offer is for ${numeral(yourOffer).format('$0,0')}... deal or no deal?`,
            offer: yourOffer,
            gameState: 'offer-pending',
        }), 1000)
    }
    pickCase = v => {
        this.setState({ message: `Let's see what you picked...`, gameState: 'waiting', pickedCase: v });
    }
    prepareOffer = () => {
        this.setState({ message: 'Okay, the rounds over and the dealer has an offer...', gameState: 'offer' });
    }
    renderCase = () => {
        if(this.state.gameState === 'over') return numeral(this.state.case.amount).format('$0,0');
        else if(this.state.case) return this.state.case.number;
        else return null;
    }
    renderRemainingAmounts = firstCol => {
        let amts = _.sortBy(this.state.cases, 'amount');
        if(firstCol) amts = amts.slice(0, amts.length / 2);
        else amts = amts.slice(amts.length / 2, amts.length);

        return amts.map((d, i) => (
        <div className='block-container'>
            <div key={i} className={`block ${d.available || this.yourCase(d) ? 'available' : null}`}>
                <span> {d.amount === 0.01 ? '$0.01' : numeral(d.amount).format('$0,0')} </span>
            </div>
        </div>
        ));
    }
    reset = () => {
        setTimeout(() => this.setState({
            gameState: 'idle',
            case: null,
            cases: null,
            left: null,
            oldOffers: [],
            round: null,
            offer: null,
            message: null,
            lastThree: [],
            pickedCase: null
        }), 1000);
    }
    selectYourCase = v => {
        this.setState({
            case: v,
            round: 1,
            left: rounds[0],
            gameState: 'round-ready',
            message: `Case ${v.number}, great choice!`
        });
    }
    start = () => {
        this.setState({ cases: shuffle(cases), gameState: 'pick', message: 'Pick your lucky case!' });
    }
    startRound = () => {
        if(this.state.left !== 0) setTimeout(() => this.setState({ gameState: 'round',  message: `Select a case to reveal...`, pickedCase: null }), 1000);
        else setTimeout(() => this.setState({ gameState: 'prepare-offer' }), 1000);
    }
    waiting = () => {
        setTimeout(() => {
            let cases = [...this.state.cases];
            let index = _.findIndex(cases, { number: this.state.pickedCase.number });
            cases[index].available = false;
            let lastThree = [...this.state.lastThree];

            if(lastThree.length < 3) lastThree.push(this.state.pickedCase.level);
            else {
                lastThree.shift();
                lastThree.push(this.state.pickedCase.level);
            }

            this.setState(prevState => ({
                cases,
                lastThree,
                message: `This case is worth.... ${this.state.pickedCase.amount === 0.01 ? '$0.01' : numeral(this.state.pickedCase.amount).format('$0,0')}!`,
                gameState: 'round-ready',
                left: prevState.left - 1
            }));
        }, 1000)
    }
    yourCase = d => {
        if(this.state.case) {
            if(this.state.case.number === d.number) return true;
            else return false;
        } else return false;
    }
    render() {
        if(this.state.gameState === 'idle') {
            return(
                <div id='splash'>
                    <h1> Deal or No Deal </h1>
                    <span> By: Brian Moore </span>
                    <button onClick={this.start}> Start </button>
                </div>
            );
        }
        return(
            <div id='app'>

                <div className={`message ${this.messageClasses()}`}>
                    {this.state.message}

                    {this.state.gameState === 'over'
                        ?
                        <div>
                            <button onClick={this.reset}> Quit </button>
                        </div>
                    : null}

                    {this.state.gameState === 'offer-pending'
                        ?
                        <div>
                            <button onClick={this.accept}> Deal </button>
                            <button onClick={this.decline}> No Deal </button>
                        </div>
                    : null}

                    {this.state.gameState === 'final'
                        ?
                        <div>
                            <button onClick={() => this.keepYourCase(true)}> Yes </button>
                            <button onClick={() => this.keepYourCase(false)}> No </button>
                        </div>
                    : null}
                </div>

                <div className='cases'>
                    {this.state.cases.map((d, i) => {
                        if(d.available && (this.state.case ? d.number !== this.state.case.number : true)) {
                            return <div className='case-container'>
                                    <button key={i} disabled={this.buttonsDisabled()} onClick={() => this.buttonAction(d)} className='case available'> {d.number} </button>
                                </div>
                        } else {
                            return <div className='case-container'>
                                    <span key={i} className='case picked'> {d.number} </span>
                                </div>
                        }
                    })}
                </div>

                <div className='right'>
                    <div className='remaining-amounts'>
                        <div className='col left'>
                            {this.renderRemainingAmounts(true)}
                        </div>
                        <div className='col right'>
                            {this.renderRemainingAmounts(false)}
                        </div>
                    </div>

                    <div className='old-offers'>
                        <h1> Previous Offers: </h1>
                        <div className='offers'>
                            {this.state.oldOffers.map((d, i) => (
                                <span key={i}> {numeral(d).format('$0,0')} </span>
                            ))}
                        </div>
                    </div>
                </div>



                <div className='panel'>
                    <div className='my-case'>
                        <h1> My Case: </h1>
                        <span> {this.renderCase()} </span>
                    </div>

                    <div className='round'>
                        <span> Round: {this.state.round} </span>
                        <span> Cases Left: {this.state.left} </span>
                    </div>
                </div>
                
            </div>
        );
    }
};