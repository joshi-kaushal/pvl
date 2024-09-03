import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function DoughnutChart({
  counts,
}: {
  counts: Record<string, number>;
}) {
  const data = {
    labels: ["Male", "Female", "Boy", "Girl"],
    datasets: [
      {
        data: [counts.Male, counts.Female, counts.Boy, counts.Girl],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="w-1/2 mx-auto">
      <Doughnut data={data} />
    </div>
  );
}
