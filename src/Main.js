import React, { useState, useEffect, Fragment } from 'react';
import { LayoutAnimation, StyleSheet, View, Dimensions, UIManager, AppState } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Deck from './data/cards';
import { reShuffle } from './helpers';
import { Overlay, ChipSelector, UserControls, FloatingText } from './components'
const { width, height } = Dimensions.get("window");
var dealerPoints;
var playerPoints;

export default function Main() {
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [gameover, setGameover] = useState(false);
    const [cardNumber, setCardNumber] = useState(0);
    const [gameMessage, setGameMessage] = useState("");
    const [appState, setAppState] = useState(AppState.currentState);
    const [totalBet, setTotalBet] = useState(0);
    const [amount, setAmount] = useState(5000);
    const [PlayerPoint, setPlayerPoint] = useState();



    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    useEffect(() => {
        _startGame()
    }, [])
    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);
        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);


    const _handleAppStateChange = nextAppState => {
        if (appState.match(/inactive|background/) && nextAppState === "active") {
            console.log("App has come to the foreground!");
        }
        setAppState(nextAppState);
    };


  
    // EndGame Method
    const endgame =  () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        let _cardNumber = cardNumber;
        dealerPoints = checkTotalPlayerPoints(dealerHand),
            playerPoints =  checkTotalPlayerPoints(playerHand);
            setPlayerPoint(playerPoints)
        while (dealerPoints < 17) {
            dealerHand.push(Deck[_cardNumber]);
            _cardNumber++;
            dealerPoints = checkTotalPlayerPoints(dealerHand);
        }
        let betValue = totalBet * 2;


        // deciding Win
        if (playerPoints == 21 && playerHand.length == 2) {
            let newAmount = totalBet * 2;
            setAmount(newAmount)
            setTotalBet(0)
            setGameover(true);
            setGameMessage('You are blackJack of the game.')
        }
        if (
            (playerPoints < 22 && dealerPoints < playerPoints) ||
            (dealerPoints > 21 && playerPoints < 22)
        ) {
            setAmount(amount + betValue)
            setTotalBet(0)
            setGameover(true);
            setGameMessage(`You win  ₹` + betValue)

        } else if (dealerPoints > 21 && playerPoints < 22) {
            setAmount(amount + betValue)
            setTotalBet(0)
            setGameover(true);
            setGameMessage(`You win  ₹` + betValue)
        }
        else if (playerPoints > 21 && dealerPoints <= 21) {
            setDealerHand(dealerHand);
            setCardNumber(_cardNumber);
            setGameover(true);
            setTotalBet(0)
            setGameMessage('Bust!')
        } else if (playerPoints == dealerPoints) {
            setAmount(amount + betValue)
            setTotalBet(0)
            setGameover(true);
            setGameMessage('push !')
        } else {
            setTotalBet(0)
            setGameover(true);
            setGameMessage(`Dealer Wins ₹${betValue}`)
        }
    }


    // checking player total points
    const checkTotalPlayerPoints = (hand) => {
        let adjustedAce = false,
            points = 0;

        hand.map((card, _index) => {
            if (card.name == 'A' && !adjustedAce) {
                adjustedAce = true;
                points = points + 10;
            }
            points = points + card.value;
        });

        if (adjustedAce && points > 21) {
            points = points - 10;
        }
        return points;
    }

    // Hit card 
    const hit = () => {
        let tempHand = [...playerHand]
        tempHand.push(Deck[cardNumber]);
        let userPoints = checkTotalPlayerPoints(tempHand);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setPlayerHand(tempHand)
        setCardNumber(cardNumber)
        setPlayerPoint(userPoints)
        if (userPoints > 21) {
            endgame();
            return;
        }
    }

    // to start game 
    const _startGame = () => {
        let cardNumber = 0;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        reShuffle(Deck)
        let tempPlayerHand = [];
        let tempDealerHand = [];

        for (let i = 0; i < 2; i++) {
            tempPlayerHand.push(Deck[cardNumber]);
            cardNumber++;
            tempDealerHand.push(Deck[cardNumber]);
            cardNumber++;
        }
        setPlayerHand(tempPlayerHand)
        setDealerHand(tempDealerHand)
        setGameover(false)
        setCardNumber(cardNumber),
            setGameMessage('')
    }

    const doubleGame = () => {

        setTimeout(() => {
            hit()
        }, 1000);
       
        endgame();
    }
    const moreMoney = () => {
        setAmount(amount + 5000)
    }


    return (
        <Fragment>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'green' }}>
            <View style={{position:'absolute', top: 40, alignItems: "center",alignSelf:'center'}}>
                <FloatingText
                    text={`Available  ₹${amount}`}
                />
            </View>
            <View style={styles.bottom}>

                <UserControls
                    playerHand={playerHand}
                    dealerHand={dealerHand}
                    newGame={() => _startGame()}
                    hit={() => hit()}
                    doubleGame={() => doubleGame()}
                    endgame={() => endgame()}
                    gameover={gameover}
                    totalBet={totalBet}
                    moreMoney={() => moreMoney()}
                />

                {gameover && gameMessage != "" && <Overlay delearPoint={dealerPoints} userPoint={PlayerPoint} text={gameMessage} onClose={() => { _startGame() }} />}
            </View>
            <View style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
            }}>
                <View style={styles.center}>
                    <FloatingText
                        text={`Total Bet  ₹${totalBet}`}
                    />
                </View>
                <ChipSelector
                    onSelect={(chipValue) => {
                        if (!gameover) {
                            if (chipValue <= amount) {
                                setTotalBet(totalBet + chipValue)
                                setAmount(amount - chipValue)
                            }
                        } else {
                            if (amount > 0) {
                                _startGame();
                                setTotalBet(totalBet + chipValue)
                                setAmount(amount - chipValue)
                            }
                        }
                    }}
                />
            </View>
            </SafeAreaView>

        </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    center: {
        alignItems: "center",
        marginVertical: 20
    },
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: height / 4,
        bottom: height / 4
    }
});



