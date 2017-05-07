import Util from '../common/util';
import Highcharts from '../lib/highstock';
var  instance = null;
export default {
	initChart(data) {
		instance = new Highcharts.StockChart({
			chart: {
			renderTo: 'stockWrap',
	        className: 'stock-chart',
	        backgroundColor: '#150d22',
	        reflow: true,
	        zoomType: '',
	        panning: true,
	        pinchType: true,
	        resetZoomButton: {
	          theme:{
	            style:{
	              display:'none'
	            }
	          }
	        }
	    },

        events: {
          redraw: function(event) {
            if (this.xAxis) {
              var extremes = this.xAxis[0].getExtremes();
              if (extremes && extremes.min == extremes.dataMin) {
                // console.log("time to load more data!");
                
              }
            }
          }
        },

        loading: {
          style: {
             backgroundColor: 'rgba(24,14,35,0.2)'
          },
          labelStyle: {
            color: 'white'
          }
      	},

      	title: {
	        style: {
	          display: 'none'
	        }
	    },

	    colors: ['#2dcea4'],

	    credits: {
	        enabled: false
	    },
	    exporting: {
	        enabled: false
	    },

	    navigator: {
        enabled: false,
        
	       	series: {
	            data: data
	        },
	        maskFill: 'rgba(128, 179, 236, 0.1)',
	        handles: {
	            backgroundColor: '#9579DB',
	            height: 100
	         }
	        // adaptToUpdatedData: false
      	},

      	scrollbar: {
        	enabled: false,
        	liveRedraw: false,
        	height: 0
      	},

	    rangeSelector: {
	    enabled: false,
	    buttons: [{
	          type: 'minute',
	          count: 1,
	          text: '1M'
	    }, {
	          type: 'minute',
	          count: 5,
	          text: '5M'
	    }, {
	          type: 'minute',
	          count: 15,
	          text: '15M'
	    }, {
	          type: 'minute',
	          count: 30,
	          text: '30M'
	    }, {
	          type: 'hour',
	          count: 1,
	          text: '1h'
	    }, {
	          type: 'day',
	          count: 1,
	          text: '1D'
	    }, {
	          type: 'all',
	          count: 1,
	          text: 'All'
	    }],
	    // selected: 0,//
	    buttonSpacing: 0,
	    inputEnabled: false,
	    buttonTheme: {
	        fill: '#1c2230',
	        stroke: 'none',
	        width: 100,
	        'stroke-width': 0,
	        r: 0,
	        style: {
	            color: '#807691',
	            fontWeight: 'bold',
	            fontSize: '.5rem',
	        },
	        states: {
	            select: {
	              fill: '#1b5f5e',
	              style: {
	                color: 'white'
	              }
	            }
	          }
	        },
	        inputBoxBorderColor: 'gray',
	        labelStyle: {
	          color: 'red',
	          fontWeight: 'bold',
	          display: 'none'
	        },
	    },

	    plotOptions: {
	        candlestick: {
	          lineColor: '#27c1a7',
	          upLineColor: '#f74b47',
	          color: '#27c1a7',
	          upColor: '#f74b47',
	        },
	        series: {
	            gapSize: 0
	        }
	    },

	    xAxis: {
	        gridLineColor: '#20182d',
	        gridLineWidth: 1,
	       
	        // type: 'datetime',
	        // minRange: 3600 * 1000 * 24 * 25

	        events : {
	          //afterSetExtremes : this.afterSetExtremes
	        }

	    },

	    yAxis: {
	        gridLineColor: '#20182d',
	        // plotLines: [plotLines],
	        endOnTick: false
	    },

	    series: [{
	        // name: stockName,
	        type: 'candlestick',
	        data: data,
	        id: 'dataseries',
	        // pointWidth: 10,
	        // maxPointWidth: 50,
	        // minPointWidth: 50,
	        dataGrouping: {
	          enabled: false
	        },
	        tooltip: {
	          valueDecimals: 2
	        },
	        tickPixelInterval: 100
	    }],

	     tooltip: {
	        useHTML: true,
	        formatter: function(e) {
	          return [
	            '<p>' + Util.formateDate(this.points[0].key) + '</p>',
	            '<p>' + this.points[0].series.name + '</p>',
	            '<p>开盘：' + this.points[0].point.open + '</p>',
	            '<p>最高：' + this.points[0].point.high + '</p>',
	            '<p>最低：' + this.points[0].point.low + '</p>',
	            '<p>收盘：' + this.points[0].point.close + '</p>'
	          ].join('')
	        },

	        backgroundColor: 'rgba(22,14,27,0.85)',
	        borderColor: '#2f2543'
	    }
		
		});

		return instance;
	},

	setChartData(data) {
		instance&&instance.get('dataseries').setData(data, true);
	},

	addChartPoint(point) {
		const data = instance.get('dataseries').data,
			lastData = data[data.length - 1],
			date = new Date(point[0]);

		if (true) {
			updata();
		}


		//updata the chart lastData
		function updata() {
			lastData.update(point);
		};

		function add() {
	      // [x, open, high, low, close]
	      const newPoint = [point[0], point[4], point[4], point[4], point[4]];
	      try {
	        instance.get('dataseries').addPoint(point, false, true);
	        instance.series[1].addPoint(point, false, true);
	        instance.redraw();

	        return newPoint;
	      } catch (e) {
	        console.log(e);

	      }
	    }
	},
}