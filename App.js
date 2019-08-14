import React, { Component } from "react";
import { Text, ScrollView, View } from "react-native";

import AreaSpline from "./js/charts/AreaSpline";
import Pie from "./js/charts/Pie";
import Theme from "./js/theme";
import data from "./resources/data";

type State = {
  activeIndex: number,
  exercisesPerYear: any
};

export default class App extends Component {
  state: State;

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      exercisesPerYear: data.exercisesPerYear
    };
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
    this._shuffle = this._shuffle.bind(this);
  }

  _onPieItemSelected(newIndex) {
    this.setState({
      ...this.state,
      activeIndex: newIndex,
      exercisesPerYear: this._shuffle(data.exercisesPerYear)
    });
  }

  _shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }

  render() {
    const height = 200;
    const width = 500;

    return (
      <ScrollView style={{ borderWidth: 1, borderColor: "red" }}>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.chart_title}>
              Distribution of exercise this month
            </Text>
            <Pie
              pieWidth={150}
              pieHeight={150}
              onItemSelected={this._onPieItemSelected}
              colors={Theme.colors}
              width={width}
              height={height}
              data={data.exercisesLastMonth}
            />
          </View>

          <View style={styles.subContainer}>
            <Text style={styles.chart_title}>
              Pace for {data.exercisesLastMonth[this.state.activeIndex].name}
            </Text>
            <AreaSpline
              width={width}
              height={height}
              data={this.state.exercisesPerYear}
              color={Theme.colors[this.state.activeIndex]}
            />
          </View>

          <View style={styles.subContainer}>
            <Text style={styles.chart_title}>
              Speed for {data.exercisesLastMonth[this.state.activeIndex].name}
            </Text>
            <AreaSpline
              width={width}
              height={height}
              data={this.state.exercisesPerYear}
              color={Theme.colors[this.state.activeIndex]}
            />
          </View>

          <View style={styles.subContainer}>
            <Text style={styles.chart_title}>
              Elevation for{" "}
              {data.exercisesLastMonth[this.state.activeIndex].name}
            </Text>
            <AreaSpline
              width={width}
              height={height}
              data={this.state.exercisesPerYear}
              color={Theme.colors[this.state.activeIndex]}
            />
          </View>

          <View style={styles.subContainer}>
            <Text style={styles.chart_title}>
              Heart Rate for
              {data.exercisesLastMonth[this.state.activeIndex].name}
            </Text>
            <AreaSpline
              width={width}
              height={height}
              data={this.state.exercisesPerYear}
              color={Theme.colors[this.state.activeIndex]}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "rgb(245, 247, 249)",
    marginTop: 20,
    borderColor: "orange",
    borderWidth: 1
  },
  subContainer: {
    borderTopWidth: 1,
    borderTopColor: "grey",
    paddingTop: 10
  },
  chart_title: {
    textAlign: "center",
    fontSize: 12,
    color: "grey",
    fontWeight: "bold"
  }
};
