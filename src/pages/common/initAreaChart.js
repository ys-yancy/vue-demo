import Util from '../common/util';
import Highcharts from '../lib/highstock';
const areaChartMixin = {
	data() {
		instance: null,
	}
	methods: {
		initAreaChart(data) {
			this.instance = new Highcharts.StockChart({
				chart: {
					renderTo: 'J_Chart',
					className: 'stock-chart-area',
					backgroundColor: '#43496a',
					reflow: true,
					pinchType: 'x',
					zoomType: '',
					panning: true,
					spacing: [10, 10, 10, 10],
					width: $(window).width(),
					height: parseFloat($('html').css('font-size')) * 8
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
					enabled: false
				},
				plotOptions: {
					candlestick: {
						lineColor: '#27c1a7',
						upLineColor: '#f74b47',
						color: '#27c1a7',
						upColor: '#f74b47',
					}
				},
				xAxis: {
					range: 6 * 3600 * 1000,
					labels: {
						style: {
							color: '#fff'
						}
					}
				},

				yAxis: {
					labels: {
						style: {
							color: '#fff'
						}
					}
				},


				series: [{
					name: 'AAPL Stock Price',
					data: data,
					type: 'area',
					color: '#01bdf1',
					threshold: null,
					tooltip: {
						valueDecimals: 2,
						backgroundColor: '#dc9702'
					},
					marker: {
						enabled: true,
						radius: 3,
						fillColor: '#01bdf1'
					},
					fillColor: {
						linearGradient: {
							x1: 0,
							y1: 0,
							x2: 0,
							y2: 1
						},
						stops: [
							[0, '#2c3053'], //Highcharts.getOptions().colors[0]],
							[1, '#2e355e'] //Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
						]
					}
				}],
				tooltip: {
					useHTML: true,
					formatter: function(e) {
						return '<p>' + this.points[0].point.y + '</p>'
					},
					backgroundColor: '#dc9702',
					style: {
						color: '#fff',
						fontSize: '.55rem'
					},
					borderRadius: 4,
					borderWidth: 0
				},
			});

			return this.instance;
		},

		addChartPoint() {
			const data = this.instance.series[0].data;
			lastData = data[data.length - 1],
				lastDate = new Date(lastData.category);
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
					this.instance.series[0].addPoint(point, false, true);
					this.instance.redraw();

					return newPoint;
				} catch (e) {
					console.log(e);

				}
			}
		}
	}

}