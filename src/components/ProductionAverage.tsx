import React from "react";
import { Table } from "@mantine/core";
import { data } from "../constant/data";
import { DataItem } from "../constant/types";

interface CropAverageData {
  crop: string;
  averageYield: number;
  averageArea: number;
}

const calculateAverages = (data: DataItem[]): CropAverageData[] => {
  // this object will map crop name to an object containing yieldSum, areaSum, and count
  const cropMap: {
    [crop: string]: { yieldSum: number; areaSum: number; count: number };
  } = {};

  // this will calculate sum of yield and area for each crop
  data.forEach((item) => {
    const crop = item["Crop Name"];
    // if string is empty then it will be 0
    const yieldValue =
      Number(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0;
    const areaValue =
      Number(item["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0;

    cropMap[crop] = cropMap[crop] || { yieldSum: 0, areaSum: 0, count: 0 };

    // incrementing yieldSum, areaSum, and count for each crop
    cropMap[crop].yieldSum += yieldValue;
    cropMap[crop].areaSum += areaValue;
    cropMap[crop].count++;
  });

  // and then we will calculate average for each crop
  const result: CropAverageData[] = Object.entries(cropMap).map(
    ([crop, values]) => ({
      crop,
      averageYield: parseFloat((values.yieldSum / values.count).toFixed(3)),
      averageArea: parseFloat((values.areaSum / values.count).toFixed(3)),
    })
  );

  return result;
};

const ProductionAverage: React.FC = () => {
  const averageData = calculateAverages(data as DataItem[]);

  return (
    <>
      <h2> Crop Production Average </h2>
      <Table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #e0e0e0",
                padding: "8px",
                backgroundColor: "#f5f5f5",
              }}
            >
              Crop
            </th>
            <th
              style={{
                border: "1px solid #e0e0e0",
                padding: "8px",
                backgroundColor: "#f5f5f5",
              }}
            >
              Average Yield (Kg/Ha)
            </th>
            <th
              style={{
                border: "1px solid #e0e0e0",
                padding: "8px",
                backgroundColor: "#f5f5f5",
              }}
            >
              Average Cultivation Area (Ha)
            </th>
          </tr>
        </thead>
        <tbody>
          {averageData.map((item) => (
            <tr key={item.crop}>
              <td style={{ border: "1px solid #e0e0e0", padding: "8px" }}>
                {item.crop}
              </td>
              <td style={{ border: "1px solid #e0e0e0", padding: "8px" }}>
                {item.averageYield}
              </td>
              <td style={{ border: "1px solid #e0e0e0", padding: "8px" }}>
                {item.averageArea}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductionAverage;
