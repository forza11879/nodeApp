document.addEventListener('DOMContentLoaded', getSymbolWebApi);
const requestSymbol = document.querySelector('#requestSymbol');
requestSymbol.addEventListener('click', getSymbolWebApi);
symbolTags.addEventListener('keyup', executeEnterKey);

function executeEnterKey(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    requestSymbol.click();
  }
}

function getSymbolWebApi() {
  const symbolTagsValue = symbolTags.value;
  const curValueAjax = symbolTagsValue || 'RY';

  fetch(`/api/v1/stock/app/${curValueAjax}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // drawChart(data)
      // split the data set into ohlc and volume
      const ohlc = [];
      const volume = [];
      // dataLength = data.length,
      // set the allowed units for data grouping
      const groupingUnits = [
        [
          'week', // unit name
          [1], // allowed multiples
        ],
        ['month', [1, 2, 3, 4, 6]],
      ];
      const i = 0;

      data.map(item => {
        ohlc.push([
          item.date,
          item.open,
          item.high,
          item.low,
          item.close,
          item.volume,
        ]);
        volume.push([
          item.date, // the date
          item.volume, // the volume
        ]);
      });

      // create the chart
      Highcharts.stockChart('container', {
        rangeSelector: {
          selected: 5,
        },

        title: {
          text: `${curValueAjax.toUpperCase()} Historical`,
        },

        yAxis: [
          {
            labels: {
              align: 'right',
              x: -3,
            },
            title: {
              text: 'OHLC',
            },
            height: '60%',
            lineWidth: 2,
            resize: {
              enabled: true,
            },
          },
          {
            labels: {
              align: 'right',
              x: -3,
            },
            title: {
              text: 'Volume',
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2,
          },
        ],

        tooltip: {
          split: true,
        },

        series: [
          {
            type: 'candlestick',
            name: `${curValueAjax.toUpperCase()}`,
            data: ohlc,
            dataGrouping: {
              units: groupingUnits,
            },
          },
          {
            type: 'column',
            name: 'Volume',
            data: volume,
            yAxis: 1,
            dataGrouping: {
              units: groupingUnits,
            },
          },
        ],
      });
    })
    .catch(error => console.error('Error:', error));
}
