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
        },
        hovermode : "closest",
    },{
        staticPlot: false,
        displayModeBar: false,
        doubleClick: true,
        showAxisDragHandles: false,
        displaylogo: false,
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

    Plotly.relayout(this.selector, minuteView);
    Plotly.extendTraces(this.selector, this.new_vals, [0])

    this.new_vals = {'x':[[]],'y':[[]],};
}


$(function() {
   var settingAPI = "http://127.0.0.1:8080/api/settings"
   var results = "";
   var charts = [];
   var graphBindLocation = ["chart1","chart2","chart3","chart4","chart5"]

   //call settings api 
   $.get(settingAPI,function(data){
      results = JSON.parse(data);
      console.log(results);
      //var options = {};
      for (var i = 0; i < results.length; i++) {
         console.log(results[i]);              
         var chart_obj = new RDVI.Chart(graphBindLocation[i], results[i]);
         charts[i] = chart_obj;

         (function(chart_obj){
            setInterval(function() {
              chart_obj.addSample(new Date(), rand());
              chart_obj.update();
              console.log(chart_obj);
            }, results[i]["refresh_rate"]*1000);
         })(chart_obj);

      }

      

   });

   //load into options 


    

    function rand() {
        return Math.random()*5+1.5;
    }

   /*{
     name: results[i]["name"],
     domain: results[i]["domain"], // sec
     limit: results[i]["limit"],
     range: [-6,6],
     refresh_rate: results[i]["refresh_rate"],
 }*/

    
});