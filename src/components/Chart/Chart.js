import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

import style from './Chart.module.scss';

const ChartCanvas = ({ data, rise, timeInterval }) => {
  const canvas = useRef();
  const ctx = useRef();
  useEffect(() => {
    ctx.current = canvas.current.getContext('2d');
    const cfg = {
      data: {
        datasets: [
          {
            label: '',
            backgroundColor: rise ? CHART_COLORS.lightGreen : CHART_COLORS.lightRed,
            borderColor: rise ? CHART_COLORS.green : CHART_COLORS.red,
            data: data
              .filter(item => Date.now() - timeInterval < item.time)
              .map(item => {
                return {
                  t: item.time,
                  y: item.priceUsd
                };
              }),
            type: 'line',
            pointRadius: 0,
            lineTension: 0,
            borderWidth: 2
          }
        ]
      },
      options: {
        animation: {
          duration: 0
        },
        legend: {
          display: false
        },
        scales: {
          padding: 0,
          xAxes: [
            {
              type: 'time',
              gridLines: {
                display: false
              },
              ticks: {
                display: false,
                padding: 10
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                display: false,
                padding: 0
              },
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: false
              }
            }
          ]
        },
        tooltips: {
          intersect: false,
          mode: 'index',
          custom: function(tooltip) {
            if (!tooltip) return;
            tooltip.displayColors = false;
          },
          callbacks: {
            label: function(tooltipItem) {
              return `Price: $${parseFloat(tooltipItem.value).toFixed(2)}`;
            }
          }
        }
      }
    };
    const newChart = new Chart(ctx.current, cfg);
    return () => {
      newChart.destroy();
    };
  }, [data, rise, timeInterval]);

  return (
    <div className={style.container}>
      <canvas ref={canvas} className={style.canvas}></canvas>
    </div>
  );
};

const CHART_COLORS = {
  green: 'rgb(41, 197, 133)',
  lightGreen: 'rgba(183, 220, 175, 0.5)',
  red: 'rgb(244, 84, 65)',
  lightRed: 'rgba(244, 84, 65, 0.3)'
};

export default ChartCanvas;
