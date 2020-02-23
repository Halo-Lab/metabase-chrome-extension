import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import * as moment from 'moment';


const ChartCanvas = ({ data }) => {
  const canvas = useRef();
  const ctx = useRef();
  useEffect(() => {
    ctx.current = canvas.current.getContext('2d');
    ctx.current.canvas.width = 475;
    ctx.current.canvas.height = 300;
    const cfg = {
      data: {
        datasets: [{
          label: '',
          backgroundColor: chartColors.green,
          borderColor: chartColors.green,
          data: data.filter(item => Date.now() - 43200000 < item.time).map(item => {
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
              padding: -25
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
            // disable displaying the color box;
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
  green: 'rgb(75, 192, 192)',
};

export default ChartCanvas;
