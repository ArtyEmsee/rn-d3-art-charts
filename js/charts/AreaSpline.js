import React from "react";
import { View, ART } from "react-native";

const { Surface, Shape, Path, Group } = ART;

import AnimShape from "../art/AnimShape";

import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as format from "d3-format";
import * as axis from "d3-axis";

const d3 = {
  scale,
  shape,
  format,
  axis
};

type Props = {
  height: number,
  width: number,
  color: any,
  data: any
};

const margin = 60;

class AreaSpline extends React.Component {
  constructor(props: Props) {
    super(props);
    this._createArea = this._createArea.bind(this);
    this._Xvalue = this._Xvalue.bind(this);
    this._Yvalue = this._Yvalue.bind(this);
    this._label = this._label.bind(this);
  }

  _Yvalue(item, index) {
    console.log("yValue for item: ", item, " -item.value: ", -item.value);
    return -item.value;
  }

  _Xvalue(item, index) {
    console.log("xValue for item: ", item, " index*5: ", index * 5);
    return index * 5;
  }

  _label(item, index) {
    return item.name;
  }

  _createArea() {
    var that = this;
    var line = d3.shape
      .line()
      .x(function(d, index) {
        return that._Xvalue(d, index);
      })
      .y(function(d, index) {
        return that._Yvalue(d, index);
      })(this.props.data);

    // .curve(d3.shape.curveNatural)(this.props.data);

    // console.debug(`area: ${JSON.stringify(area)}`);

    console.log("AreaSpline.js _createArea, line: ", line);

    return { path: line };
    // return line;
  }

  render() {
    const x = margin;
    const y = this.props.height - margin;

    return (
      <Surface
        width={this.props.width}
        height={this.props.height}
        style={{ borderColor: "green", borderWidth: 1 }}
      >
        <Group x={x} y={y}>
          <AnimShape color={this.props.color} d={() => this._createArea()} />
        </Group>
      </Surface>
    );
  }
}

export default AreaSpline;
