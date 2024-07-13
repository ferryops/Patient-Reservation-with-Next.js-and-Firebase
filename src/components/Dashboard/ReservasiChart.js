import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ReservasiChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Jumlah Reservasi",
          data: [30, 50, 80, 40, 70, 90, 100], // Sesuaikan data sesuai dengan jumlah reservasi Anda
          fill: false,
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Jumlah Reservasi Pasien per Bulan",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const myChart = new Chart(ctx, config);

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="w-full md:w-1/2">
      <canvas id="reservasiChart" ref={chartRef} />
    </div>
  );
}
