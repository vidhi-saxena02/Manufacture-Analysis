import React from "react";
import { Table } from "@mantine/core";
import { data } from "../constant/data";
import { DataItem } from "../constant/types";

interface CropData {
  Year: string;
  maxCrop: string;
  minCrop: string;
}

const transformData = (data: DataItem[]): CropData[] => {
  // using reduce to populate yearMap
  const yearMap = data.reduce((acc, item) => {
    const year = item.Year;
    const crop = item["Crop Name"];
    const production = Number(item["Crop Production (UOM:t(Tonnes))"]) || 0;

    if (!acc[year]) {
      acc[year] = {};
    }

    acc[year][crop] = production;
    return acc;
  }, {} as { [year: string]: { [crop: string]: number } });

  // this is the result array
  const result: CropData[] = [];

  // we will iterate over yearMap and find max and min crop
  Object.entries(yearMap).forEach(([year, crops]) => {
    const cropEntries = Object.entries(crops);

    // this will find crop with maximum production
    let maxCrop = cropEntries.reduce((max, curr) =>
      curr[1] > max[1] ? curr : max
    )[0];

    // this will find crop with minimum production
    let minCrop = cropEntries.reduce((min, curr) =>
      curr[1] < min[1] ? curr : min
    )[0];

    // finally push the result to the result array
    result.push({ Year: year, maxCrop, minCrop });
  });

  return result;
};

const AnnualExtreme: React.FC = () => {
  const transformedData = transformData(data as DataItem[]);

  return (
    <>
      <h2>Annual Maximum and Minimum Production </h2>
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
              Year
            </th>
            <th
              style={{
                border: "1px solid #e0e0e0",
                padding: "8px",
                backgroundColor: "#f5f5f5",
              }}
            >
              Crop with Maximum Production
            </th>
            <th
              style={{
                border: "1px solid #e0e0e0",
                padding: "8px",
                backgroundColor: "#f5f5f5",
              }}
            >
              Crop with Minimum Production
            </th>
          </tr>
        </thead>
        <tbody>
          {transformedData.map((item) => (
            <tr key={item.Year}>
              <td style={{ border: "1px solid #e0e0e0", padding: "8px" }}>
                {item.Year}
              </td>
              <td style={{ border: "1px solid #e0e0e0", padding: "8px" }}>
                {item.maxCrop}
              </td>
              <td style={{ border: "1px solid #e0e0e0", padding: "8px" }}>
                {item.minCrop}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AnnualExtreme;
