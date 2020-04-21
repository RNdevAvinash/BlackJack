import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import { pointCalculation } from '../helpers';
import { ActionButton, FloatingText, CardDeck } from '../components'
const { width } = Dimensions.get('window');

export default class UserControls extends Component {

    constructor() {
        super();
        this.state = {
            playerPoints: 0,
            dealerPoints:0
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.playerHand) {
            this.setState({
                playerPoints: pointCalculation(nextProps.playerHand),
                dealerPoints: pointCalculation(nextProps.dealerHand)
            });
        }
    }

    render() {

        const { playerHand, dealerHand, newGame, hit, endgame, doubleGame, gameover, totalBet, moreMoney } = this.props;
        const { playerPoints, dealerPoints } = this.state;

        return (
            <View style={styles.centerView}>

                <View style={styles.center}>
                    {gameover && <FloatingText text={dealerPoints} />}
                    <CardDeck
                        cards={dealerHand}
                        isDealer={true}
                        gameover={gameover}
                    />
                </View>

                <View style={styles.center}>
                    <FloatingText text={playerPoints} />
                    <CardDeck
                        cards={playerHand}
                    />
                </View>

                {totalBet == false && (<View style={[styles.absoluteBtnRight, { top: 20 }]}>
                    <ActionButton
                        direction={'left'}
                        text={"Shuffle"}
                        onPress={() => newGame()}
                    />
                </View>)}

                {totalBet == false && (<View style={[styles.absoluteBtnRight, { top: 80 }]}>
                    <ActionButton
                        direction={'left'}
                        text={"Add money"}
                        onPress={() => moreMoney()}
                    />
                </View>)}

                {!!totalBet && (<View style={[styles.absoluteBtnRight, { top: 60 }]}>
                    <ActionButton
                        direction={'left'}
                        text={"HIT"}
                        onPress={() => hit()}
                    />
                </View>)}

                {!!totalBet && (<View style={[styles.absoluteBtnRight, { top: 105 }]}>
                    <ActionButton
                        direction={'left'}
                        text={"STAND"}
                        onPress={() => endgame()}
                    />
                </View>)}

                {!!totalBet && (<View style={[styles.absoluteBtnRight, { top: 150 }]}>

                    <ActionButton
                        direction={'left'}
                        text={"DOUBLE DOWN"}
                        onPress={() => doubleGame()}
                    />
                </View>)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centerView: {
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: 10,
    },
    betText: {
        color: "white",
        textAlign: "center"
    },
    center: {
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
    },
    absoluteBtnRight: {
        position:'absolute',
        right: 0,
        zIndex: 2
    }
});
