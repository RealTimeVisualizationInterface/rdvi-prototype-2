if (typeof RDVI == 'undefined')
    RDVI = {};


RDVI.Chart = function Chart(selector, options){
    this.selector = selector;
    this.options = options;
    this.last_time = new Date(0);
    this.last_data = 0
    this.data = [{
        x: [],
        y: [],
        mode: 'markers',
        line: {color: '#f44'},
        type: 'scattergl',
    }];

    Plotly.plot(selector, this.data,{
        plot_bgcolor: '#444444',
        paper_bgcolor: '#333333',
        autosize: true,
        font:{
            family:'Comic Sans MS', 
            size:13, 
            color:'#d5d5d5',
        },
        title:options.name,
        //width: 480,
        //height: 300,

        margin: {
            l: 20,
            r: 15,
            t: 40,
            b: 30,
            pad: 0,
        },
        shapes: [
            {
                layer: 'below',
                'type': 'rect',
                'xref': 'paper',
                'yref': 'y',
                'x0': 0,
                'y0': this.options.range[0],
                'x1': 1,
                'y1': this.options.range[1],
                'line': {
                    'width': 0,
                },
                'fillcolor': 'rgba(50, 50, 20, 0)',
            },
            {
                layer: 'below',
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
        yaxis: {
            gridcolor: '#222',
            //range: this.options.range,
            fixedrange: true,
            autorange: true,
            zeroline: true,
            zerolinecolor: '#222',
            zerolinewidth: 3,
        },
        hovermode : "closest",
    },{
        showAxisDragHandles: false,
        staticPlot: false,
        displayModeBar: false,
        doubleClick: true,
        showAxisDragHandles: false,
        showAxisRangeEntryBoxes: false,
        scrollZoom: false,

        displaylogo: false,
    });
}

RDVI.Chart.prototype.addSample = function(time, val){
    if(this.last_time<time)
        this.last_time = time

    this.data[0].x.push(time);
    this.data[0].y.push(val);
}

RDVI.Chart.prototype.update = function(){
    var time = new Date();
    var pastTime = this.last_time.getTime()-this.options.domain*1000;
    var nowTime = this.last_time.getTime();

    var minuteView = {
        xaxis: {
            tickmode: 'auto',
            tick0: 0,
            showgrid: true,
            tickcolor: '#222',
            gridcolor: '#222',
            fixedrange: true,
            type: 'date',
            tickformat: '%H:%M:%S',
            hoverformat: '%c',
            range: [pastTime,nowTime]
        }
    };

    // Purge old data
    var testPastTime = new Date();
    testPastTime.setSeconds(testPastTime.getSeconds() - 60);
    while(this.data[0].x[0]<testPastTime){
        this.data[0].x.shift()
        this.data[0].y.shift()
    }

    Plotly.relayout(this.selector, minuteView);

}


$(function() {
   var settingAPI = "http://127.0.0.1:8080/api/settings"
   var samplesAPI = "http://127.0.0.1:8080/api/samples?s-3"
   var results = "";
   var charts = [];

   //call settings api 
   $.get(settingAPI,function(data){
      results = JSON.parse(data);
      for (var i = 0; i < results.length; i++) {
         var chart_obj = new RDVI.Chart(results[i].target, results[i]);
         charts[i] = chart_obj;
      }

      setInterval(function() {
         $.get(samplesAPI,function(data){
            results = JSON.parse(data);
            for (var i = 0; i < results.length; i++) {
               var sample = results[i];
               var time = new Date(sample.datetime*1000);

               for (var j = 0; j < charts.length; j++) {
                  var chart = charts[j];
                  chart.addSample(time, sample[chart.options.datap]);   
               }
            }

            for(var j in charts){
               var chart = charts[j];
               chart.update();
            }
         })
         
      }, 1000);

   });

    //load into options 

    function rand() {
        return Math.random()*10-5;
    }

    var chart4 = new RDVI.Chart('chart4', {
        "name":'perf-test',
        "domain": 65,
        "limit": [-4,4],
        "range": [-6,6],
    });
    setInterval(function() {
        for(var i=0;i<30;++i){
            chart4.addSample(new Date(), rand());
        }
        chart4.update()
    }, 100);
});