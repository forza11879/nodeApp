// eslint-disable-next-line no-use-before-define
document.addEventListener('DOMContentLoaded', getSymbolWebApi);
const symbolValueCurValue = document.querySelector('#symbolValueCurValue');
const symbolTagsChart = document.querySelector('#symbolTagsChart');
const requestSymbolChart = document.querySelector('#requestSymbolChart');

// eslint-disable-next-line no-use-before-define
requestSymbolChart.addEventListener('click', getSymbolWebApi);
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
    await fetch('/stock/updatedb');
  } catch (err) {
    console.log(err);
  }
}

setInterval(async function() {
  // eslint-disable-next-line no-use-before-define
  await updateDB();
}, 5000);

async function getSymbolWebApi() {
  const symbolValueCurValueValue = symbolValueCurValue.value;
  const symbolTagsChartValue = symbolTagsChart.value;

  const curValueAjax = symbolTagsChartValue || symbolValueCurValueValue;

  console.log(curValueAjax);

  try {
    const response = await fetch(`/stock/app/${curValueAjax}`);
    const data = await response.json();

    // drawChart(data)
    // console.log(data);
    // split the data set into ohlc and volume
    const ohlc = [];
    const volume = [];

    // set the allowed units for data grouping

    // eslint-disable-next-line no-undef
    groupingUnits = [
      [
        'week', // unit name
        [1], // allowed multiples
      ],
      ['month', [1, 2, 3, 4, 6]],
    ];
    // i = 0;

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

// ////////////

// Enable pusher logging - don't include this in production
// eslint-disable-next-line no-undef
Pusher.logToConsole = true;

// eslint-disable-next-line no-undef
const pusher = new Pusher('c53cb9e621a72be43e96', {
  cluster: 'us2',
  forceTLS: true,
});

const channel = pusher.subscribe('myChannel');

channel.bind('AnyEvent', function(data) {
  // console.log(JSON.stringify(`Data event - AnyEvent from Pusher: ${data}`));
  // drawChart(data)
  // console.log(data);
  // split the data set into ohlc and volume
  const ohlc = [];
  const volume = [];

  // set the allowed units for data grouping

  // eslint-disable-next-line no-undef
  groupingUnits = [
    [
      'week', // unit name
      [1], // allowed multiples
    ],
    ['month', [1, 2, 3, 4, 6]],
  ];
  // i = 0;

  data.chartData.map(item => {
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
      text: `${data.symbol} Historical`,
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
        name: `${data.symbol}`,

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

// channel.bind('updated', function(data) {
//   console.log(JSON.stringify(`Data event - updated from Pusher: ${data}`));
//   // console.log(`Data from Pusher: ${data}`);

// });

// channel.bind('replaced', function(data) {
//   console.log(JSON.stringify(`Data event - replaced from Pusher: ${data}`));
//   // console.log(`Data from Pusher: ${data}`);

// });
