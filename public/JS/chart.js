// eslint-disable-next-line no-use-before-define
document.addEventListener('DOMContentLoaded', getSymbolWebApiLoad);
// hidden input
const symbolValueCurValue = document.querySelector('#symbolValueCurValue');
// input
const symbolTagsChart = document.querySelector('#symbolTagsChart');
// button
const requestSymbolChart = document.querySelector('#requestSymbolChart');

// eslint-disable-next-line no-use-before-define
requestSymbolChart.addEventListener('click', getSymbolWebApiClick);
// eslint-disable-next-line no-use-before-define
symbolTagsChart.addEventListener('keyup', executeEnterKey);

function executeEnterKey(event) {
  // event.preventDefault()
  if (event.keyCode === 13) {
    requestSymbolChart.click();
  }
}

async function updateDB() {
  try {
    await fetch('/api/v1/stock/updatedb');
  } catch (err) {
    console.log(err);
  }
}

setInterval(async function() {
  // eslint-disable-next-line no-use-before-define
  await updateDB();
}, 60000);

async function getSymbolWebApiLoad() {
  // hidden input value
  const symbolValueCurValueValue = symbolValueCurValue.value;
  // input
  // const symbolTagsChartValue = symbolTagsChart.value;

  const curValueAjax = symbolValueCurValueValue;

  // console.log(curValueAjax);

  try {
    const response = await fetch(`/api/v1/stock/app/${curValueAjax}`);
    const data = await response.json();
    console.log('data webApiData from the back: ', data.webApiData);
    console.log('data symbol from the back: ', data.symbol);

    // drawChart(data)
    // console.log(data);
    // split the data set into ohlc and volume
    const ohlc = [];
    const volume = [];

    // set the allowed units for data grouping

    // eslint-disable-next-line no-undef
    const groupingUnits = [
      [
        'week', // unit name
        [1], // allowed multiples
      ],
      ['month', [1, 2, 3, 4, 6]],
    ];
    // i = 0;

    data.webApiData.map(item => {
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
    // eslint-disable-next-line no-undef
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
          name: curValueAjax.toUpperCase(),
          data: ohlc,
          dataGrouping: {
            // eslint-disable-next-line no-undef
            units: groupingUnits,
          },
        },
        {
          type: 'column',
          name: 'Volume',
          data: volume,
          yAxis: 1,
          dataGrouping: {
            // eslint-disable-next-line no-undef
            units: groupingUnits,
          },
        },
      ],
    });
  } catch (error) {
    console.error('Error', error);
  }
}

async function getSymbolWebApiClick() {
  // hidden input value
  // const symbolValueCurValueValue = symbolValueCurValue.value;
  // input
  const symbolTagsChartValue = symbolTagsChart.value;

  const curValueAjax = symbolTagsChartValue;

  console.log(curValueAjax);

  try {
    const response = await fetch(`/api/v1/stock/app/${curValueAjax}`);
    const data = await response.json();
    console.log('data webApiData from the back: ', data.webApiData);
    console.log('data symbol from the back: ', data.symbol);

    // drawChart(data)
    // console.log(data);
    // split the data set into ohlc and volume
    const ohlc = [];
    const volume = [];

    // set the allowed units for data grouping

    // eslint-disable-next-line no-undef
    const groupingUnits = [
      [
        'week', // unit name
        [1], // allowed multiples
      ],
      ['month', [1, 2, 3, 4, 6]],
    ];
    // i = 0;

    data.webApiData.map(item => {
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
    // eslint-disable-next-line no-undef
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
          name: curValueAjax.toUpperCase(),
          data: ohlc,
          dataGrouping: {
            // eslint-disable-next-line no-undef
            units: groupingUnits,
          },
        },
        {
          type: 'column',
          name: 'Volume',
          data: volume,
          yAxis: 1,
          dataGrouping: {
            // eslint-disable-next-line no-undef
            units: groupingUnits,
          },
        },
      ],
    });
  } catch (error) {
    console.error('Error', error);
  }
}

// web socket
const socket = new WebSocket('ws://localhost:3000/api/v1');

socket.addEventListener('message', event => {
  const symbol = symbolValueCurValue.value;
  const obj = JSON.parse(event.data);

  if (symbol !== obj.symbol) return;

  const objData = obj.data.map(item => ({
    date: parseFloat(item.date.$numberDecimal),
    open: parseFloat(item.open.$numberDecimal),
    high: parseFloat(item.high.$numberDecimal),
    low: parseFloat(item.low.$numberDecimal),
    close: parseFloat(item.close.$numberDecimal),
    volume: parseInt(item.volume.$numberDecimal),
  }));
  console.log('Message from server:', objData);

  const ohlc = [];
  const volume = [];

  // set the allowed units for data grouping

  // eslint-disable-next-line no-undef
  const groupingUnits = [
    [
      'week', // unit name
      [1], // allowed multiples
    ],
    ['month', [1, 2, 3, 4, 6]],
  ];
  // i = 0;
  // data.chartData

  objData.map(item => {
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
  // eslint-disable-next-line no-undef
  Highcharts.stockChart('container', {
    rangeSelector: {
      selected: 5,
    },
    title: {
      // text: `Symbol Historical`
      // text: `${curValueAjax.toUpperCase()} Symbol Historical`
      text: `${obj.symbol} Historical`,
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
        // name: curValueAjax.toUpperCase(),
        // name: `Symbol`,
        name: `${obj.symbol}`,

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
          // eslint-disable-next-line no-undef
          units: groupingUnits,
        },
      },
    ],
  });
});
