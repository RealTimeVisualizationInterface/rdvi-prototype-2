if (typeof RDVI == 'undefined')
    RDVI = {};

(function(){

    this.render = function( options ) {
    }
}).call(RDVI);



$(function() {

    function rand() {
        return Math.random()*5+1.5;
    }

    var time = new Date();




    var arrayLength = 80
    var newArray = []

    for(var i = 0; i < arrayLength; i++) {
      var y = Math.round(Math.random()*10) + 1
      newArray[i] = y
    }

    Plotly.plot('chart1', [{
        x: [time],
        y: [rand],
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
            range: [0,8],
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

        var time = new Date();

        var update = {
        x:  [[time]],
        y: [[rand()]]
        }

        var olderTime = time.setMinutes(time.getMinutes() - 1);
        var futureTime = time.setMinutes(time.getMinutes() + 1);

        var minuteView = {
            xaxis: {
                fixedrange: true,
                type: 'date',
                range: [olderTime,futureTime]
            }
        };

        Plotly.relayout('chart1', minuteView);
        Plotly.extendTraces('chart1', update, [0])

        if(cnt === 100) clearInterval(interval);
    }, 100);
});