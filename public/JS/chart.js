/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable array-callback-return */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable one-var */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
document.addEventListener('DOMContentLoaded', getSymbolWebApi);
const symbolValueCurValue = document.querySelector('#symbolValueCurValue');
const symbolTagsChart = document.querySelector('#symbolTagsChart');
const requestSymbolChart = document.querySelector('#requestSymbolChart');

requestSymbolChart.addEventListener('click', getSymbolWebApi);
symbolTagsChart.addEventListener('keyup', executeEnterKey);

function executeEnterKey(event) {
  // event.preventDefault()
  if (event.keyCode === 13) {
    requestSymbolChart.click();
  }
}

async function getSymbolWebApi() {
  const symbolValueCurValueValue = symbolValueCurValue.value;
  const symbolTagsChartValue = symbolTagsChart.value;

  let curValueAjax = symbolTagsChartValue
    ? symbolTagsChartValue
    : symbolValueCurValueValue;

  console.log(curValueAjax);

  try {
    const response = await fetch(`/stock/app/${curValueAjax}`);
    const data = await response.json();

    // drawChart(data)
    // console.log(data);
    // split the data set into ohlc and volume
    var ohlc = [],
      volume = [],
      // dataLength = data.length,
      // set the allowed units for data grouping
      groupingUnits = [
        [
          'week', // unit name
          [1] // allowed multiples
        ],
        ['month', [1, 2, 3, 4, 6]]
      ],
      i = 0;

    data.map(item => {
      ohlc.push([
        item.date,
        item.open,
        item.high,
        item.low,
        item.close,
        item.volume
      ]);
      volume.push([
        item.date, // the date
        item.volume // the volume
      ]);
    });

    // create the chart
    Highcharts.stockChart('container', {
      rangeSelector: {
        selected: 5
      },

      title: {
        text: `${curValueAjax.toUpperCase()} Historical`
      },

      yAxis: [
        {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'OHLC'
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true
          }
        },
        {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'Volume'
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2
        }
      ],

      tooltip: {
        split: true
      },

      series: [
        {
          type: 'candlestick',
          name: curValueAjax.toUpperCase(),
          data: ohlc,
          dataGrouping: {
            units: groupingUnits
          }
        },
        {
          type: 'column',
          name: 'Volume',
          data: volume,
          yAxis: 1,
          dataGrouping: {
            units: groupingUnits
          }
        }
      ]
    });
  } catch (error) {
    console.error('Error', error);
  }
}

// setInterval(async function() {
//   // eslint-disable-next-line no-use-before-define
//   await getSymbolWebApi();
// }, 5000);


// ////////////

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

const pusher = new Pusher('c53cb9e621a72be43e96', {
  cluster: 'us2',
  forceTLS: true
});

const channel = pusher.subscribe('myChannel');
channel.bind('updated', function(data) {
  // console.log(JSON.stringify(`Data from Pusher: ${data}`));
  console.log(`Data from Pusher: ${data}`);

});
