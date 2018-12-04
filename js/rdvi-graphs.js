if (typeof RDVI == 'undefined')
    RDVI = {};


function RDVI.Chart(selector, options){
	this.selector = selector;
	this.options = options;

    Plotly.plot(selector, [{
        x: [],
        y: [],
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
            b: 25,
            pad: 0,
        },
        shapes: [
            {
                'type': 'rect',
                'xref': 'paper',
                'yref': 'y',
                'x0': 0,
                'y0': 2,
                'x1': 1,
                'y1': 6,
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
            gridcolor: '#222',
            range: [0,8],
            'fixedrange': true
        }
    },{
        staticPlot: true,
        displayModeBar: false,
        doubleClick: false,
        showAxisDragHandles: false,
    });
}

RDVI.Chart.prototype.addSamples = function(samples){
	
}



$(function() {

	var options = {
        name: "data1",
        range: 60, // sec
        limit: [-4,4],
        refresh_rate: 1,
    }

	var chart1 = new RDVI.Chart('chart1', options);


    function rand() {
        return Math.random()*5+1.5;
    }

    var time = new Date();



    var interval = setInterval(function() {

        var time = new Date();

        var update = {
        	x:  [[time,time,time,time,time]],
        	y: [[rand(),rand(),rand(),rand(),rand()]]
        }

        var olderTime = time.getTime()-60000;
        var futureTime = time.getTime();

        var minuteView = {
            xaxis: {
                tickmode: 'linear',
                tick0: 0,
                dtick: 5000,
                tickcolor: '#222',
                gridcolor: '#222',
                fixedrange: true,
                type: 'date',
                range: [olderTime,futureTime]
            }
        };

        Plotly.relayout('chart1', minuteView);
        Plotly.extendTraces('chart1', update, [0])
    }, 1000);
});
