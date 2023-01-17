import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';

interface Data {
  chartType: string;
  xKey: string;
  yKey: string;
  description: string;
  title: string;
  data: Array<any>;
}

interface Props {
  chartProps: Data;
}

const BarGraph: React.FC<Props> = ({ chartProps }) => {
  const dataToMap = chartProps.data;
  // Define the graph dimensions and margins
  const width = 500;
  const height = 200;
  const margin = { top: 20, bottom: 20, left: 20, right: 20 };
  
  // Then we'll create some bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;


  // We'll make some helpers to get at the data we want
  const x = (d: any) => d[chartProps.xKey];
  const y = (d: any) => {
    let number = +d[chartProps.yKey];
  
    if(d[chartProps.yKey].includes("%")) {
      const percentageConvertedToNumber = d[chartProps.yKey].replaceAll("%", "");
      console.log(percentageConvertedToNumber);
      number = percentageConvertedToNumber;
    }
    return number * 100;
  };

  const xScale = scaleBand<string>({
    range: [0, xMax],
    round: true,
    domain: dataToMap.map(x),
    padding: 0.4,
  });
  const yScale = scaleLinear<number>({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...dataToMap.map(y))],
  });
  
  // Compose together the scale and accessor functions to get point functions
  const compose = (scale:Function, accessor:Function) => (data:Data) => scale(accessor(data));
  const xPoint = compose(xScale, x);
  const yPoint = compose(yScale, y);
  
  return (
    <svg width={width} height={height}>
      {dataToMap.map((d, i) => {
        const barHeight = yMax - yPoint(d);
        return (
          <Group key={`bar-${i}`}>
            <Bar
              x={xPoint(d)}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              fill="#3b705c"
            />
          </Group>
        );
      })}
    </svg>
  );
}

export default BarGraph;
