import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import { PieChart } from "react-native-chart-kit";

export default class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            email: '',
            data: [
                {
                    name: "Seoul",
                    population: 21500000,
                    color: "rgba(131, 167, 234, 1)",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                },
                {
                    name: "Toronto",
                    population: 2800000,
                    color: "#F00",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                },
                {
                    name: "Beijing",
                    population: 527612,
                    color: "red",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                },
                {
                    name: "New York",
                    population: 8538000,
                    color: "#ffffff",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                },
                {
                    name: "Moscow",
                    population: 11920000,
                    color: "rgb(0, 0, 255)",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                }
            ]
        };
    }

    chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };


    render() {
        return (
            <View style={style.container}>
                <PieChart
                    data={this.state.data}
                    width={400}
                    height={400}
                    chartConfig={this.chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    center={[10, 50]}
                    absolute
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'#dfe4ea',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
