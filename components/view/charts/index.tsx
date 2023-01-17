import { useEffect, useState } from "react";
import BarGraph from "./chartTypes/bar";
import { stringifiedFileToArrayOfObj } from "../../../utils/arrays";

interface Props {
  chartTypesList: Array<any>;
  data: string;
}

const Charts: React.FC<Props> = ({ chartTypesList, data }) => {
  const [mappedData, setMappedData] = useState<Array<any>>([])
  const [chartsData, setChartsData] = useState<Array<any>>([])

  useEffect(() => {
    if (chartTypesList.length > 0) {
      setMappedData(stringifiedFileToArrayOfObj(data));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartTypesList])
  
  useEffect(() => {
    if (mappedData.length > 0 && chartTypesList.length > 0) {
      const chartsData = chartTypesList.map((element) => {
        let newArr: any = [];
        
        // Replacing spacing by underscored sign to avoid issues accessing the props
        element.xKey = element.xKey.replaceAll(" ", "_")
        element.yKey = element.yKey.replaceAll(" ", "_")
    
        mappedData.forEach((d) => {
          let newObj: any = {},
              xValue = d[element.xKey],
              yValue = d[element.yKey];
          if (xValue && yValue) {
            newObj[element.xKey] = xValue;
            newObj[element.yKey] = yValue;
    
            newArr.push(newObj);
          }
        });
        element.data = newArr; // => Adding data to build chart (X and Y data)
        return element;
      });
      setChartsData(chartsData);
    }
  }, [mappedData, chartTypesList])

  return (
    <>
    {
      chartsData.map((chartProps, index) => { 
        if (chartProps.chartType === "bar") {
          return <BarGraph key={`${index}-${chartProps.chartType}`} chartProps={chartProps} />;
        }
      })
    }
    </>
  );
}

export default Charts;