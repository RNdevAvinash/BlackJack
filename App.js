import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Main from './src/Main'
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class App extends Component {
    render() {
        return (
            <SafeAreaProvider>
                    <StatusBar backgroundColor={"green"} translucent={true} barStyle="light-content" />
                    <Main />
            </SafeAreaProvider>

        )
    }
}




