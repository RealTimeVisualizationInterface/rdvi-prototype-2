if (typeof RDVI == 'undefined')
    RDVI = {};

(function(){

    this.render = function( options ) {
    }
}).call(RDVI);



$(function() {

    var arrayLength = 80
    var newArray = []

    for(var i = 0; i < arrayLength; i++) {
      var y = Math.round(Math.random()*10) + 1
      newArray[i] = y
    }

    Plotly.plot('chart1', [{
        y: newArray,
        mode: 'markers',
        line: {color: '#f44'},
        type: 'scatter'
    }],{
        plot_bgcolor: '#444444',
        paper_bgcolor: '#333333',
        autosize: true,
		//width: 480,
		//height: 300,
        margin: {
        	l: 20,
        	r: 20,
        	t: 20,
        	b: 20,
        	pad: 0,
        },
        shapes: [
            {
                'type': 'rect',
                'xref': 'x',
                'yref': 'y',
                'x0': 0,
                'y0': 4,
                'x1': 80,
                'y1': 8,
                'line': {
					'width': 0,
                },
                'fillcolor': 'rgba(50, 230, 96, 0.3)',
            },
        ],
        font: {
        	color: '#dddddd'
        },
        yaxis: {
			'fixedrange': true
		},
		xaxis: {
			range: [0, 80],
			fixedrange: true
		}
    },{
    	staticPlot: true,
    	displayModeBar: false,
    	doubleClick: false,
    	showAxisDragHandles: false,
    });

    var cnt = 0;

    var interval = setInterval(function() {
      
      var y = Math.round(Math.random()*10) + 1
      newArray = newArray.concat(y)
      newArray.splice(0, 1)
      
      var data_update = {
        y: [newArray]
      };
      
      Plotly.update('chart1', data_update)
      
      if(cnt === 100) clearInterval(interval);
    }, 100);
});