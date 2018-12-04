if (typeof RDVI == 'undefined')
    RDVI = {};


RDVI.Chart = function Chart(selector, options){
    this.selector = selector;
    this.options = options;
    this.last_time = new Date();
    this.new_vals = {
        'x':[[]],
        'y':[[]],
    };

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
                'y0': this.options.limit[0],
                'x1': 1,
                'y1': this.options.limit[1],
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
            range: this.options.range,
            'fixedrange': true
        }
    },{
        staticPlot: true,
        displayModeBar: false,
        doubleClick: false,
        showAxisDragHandles: false,
    });
}

RDVI.Chart.prototype.addSample = function(time, val){
    if(this.last_time<time)
        this.last_time = time

    this.new_vals.x[0].push(time);
    this.new_vals.y[0].push(val);
}

RDVI.Chart.prototype.update = function(){
    var time = new Date();
    var pastTime = this.last_time.getTime()-this.options.domain*1000;
    var nowTime = this.last_time.getTime();

    var minuteView = {
        xaxis: {
            tickmode: 'linear',
            tick0: 0,
            dtick: 5000,
            tickcolor: '#222',
            gridcolor: '#222',
            fixedrange: true,
            type: 'date',
            range: [pastTime,nowTime]
        }
    };

    Plotly.relayout('chart1', minuteView);
    Plotly.extendTraces('chart1', this.new_vals, [0])

    this.new_vals = {'x':[[]],'y':[[]],};
}


$(function() {

    var options = {
        name: "data1",
        domain: 60, // sec
        limit: [-4,4],
        range: [-6,6],
        refresh_rate: 1,
    }

    var chart1 = new RDVI.Chart('chart1', options);


    function rand() {
        return Math.random()*5+1.5;
    }


    var interval = setInterval(function() {
        chart1.addSample(new Date(), rand());
        chart1.addSample(new Date(), rand());
        chart1.addSample(new Date(), rand());
        chart1.update();
    }, options.refresh_rate*1000);
});
