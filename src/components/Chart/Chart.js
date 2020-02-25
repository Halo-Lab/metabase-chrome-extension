import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import * as moment from 'moment';


const ChartCanvas = ({ data, rise }) => {
  const canvas = useRef();
  const ctx = useRef();
  useEffect(() => {
    ctx.current = canvas.current.getContext('2d');
    ctx.current.canvas.width = 435;
    ctx.current.canvas.height = 250;
    const cfg = {
      data: {
        datasets: [{
          label: '',
          backgroundColor: rise ? chartColors.lightGreen : chartColors.lightRed,
          borderColor: rise ? chartColors.green : chartColors.red,
          data: data.filter(item => Date.now() - DAY_MILLISECONDS/2 < item.time).map(item => {
            return {
              't': item.time,
              'y': item.priceUsd
            }
          }),
          type: 'line',
          pointRadius: 0,
          lineTension: 0,
          borderWidth: 2
        }]
      },
      options: {
        animation: {
          duration: 0
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'series',
            offset: true,
            ticks: {
              major: {
                enabled: true,
                fontStyle: 'bold'
              },
              source: 'data',
              autoSkip: true,
              autoSkipPadding: 75,
              maxRotation: 0,
              sampleSize: 100
            },
            afterBuildTicks: function (scale, ticks) {
              var majorUnit = scale._majorUnit;
              var firstTick = ticks[0];
              var i, ilen, val, tick, currMajor, lastMajor;

              val = moment(ticks[0].value);
              if ((majorUnit === 'minute' && val.second() === 0)
                || (majorUnit === 'hour' && val.minute() === 0)
                || (majorUnit === 'day' && val.hour() === 9)
                || (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
                || (majorUnit === 'year' && val.month() === 0)) {
                firstTick.major = true;
              } else {
                firstTick.major = false;
              }
              lastMajor = val.get(majorUnit);

              for (i = 1, ilen = ticks.length; i < ilen; i++) {
                tick = ticks[i];
                val = moment(tick.value);
                currMajor = val.get(majorUnit);
                tick.major = currMajor !== lastMajor;
                lastMajor = currMajor;
              }
              return ticks;
            }
          }],
          yAxes: [{
            ticks: {
              padding: 0
            },
            gridLines: {
              drawBorder: false
            },
            scaleLabel: {
              display: false,
            }
          }]
        },
        tooltips: {
          intersect: false,
          mode: 'index',
          custom: function (tooltip) {
            if (!tooltip) return;
            tooltip.displayColors = false;
          },
          callbacks: {
            label: function (tooltipItem) {
              return `Price: $${parseFloat(tooltipItem.value).toFixed(2)}`;
            }
          }
        }
      }
    };
    new Chart(ctx.current, cfg);
  }, [])

  return (
    <canvas ref={canvas}></canvas>
  )
}

const chartColors = {
  green: 'rgb(183, 220, 175)',
  lightGreen: 'rgba(183, 220, 175, 0.5)',
  red: 'rgb(244, 84, 65)',
  lightRed: 'rgba(244, 84, 65, 0.3)'
};
const DAY_MILLISECONDS = 86400000;

export default ChartCanvas;
