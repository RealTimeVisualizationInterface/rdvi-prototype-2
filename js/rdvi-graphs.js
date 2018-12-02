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
        line: {color: '#80CAF6'},
        type: 'scatter'
    }],{
        'shapes': [
            {
                'type': 'rect',
                'xref': 'x',
                'yref': 'y',
                'x0': 0,
                'y0': 4,
                'x1': 80,
                'y1': 8,
                'line': {
                    'color': 'rgb(50, 171, 96)',
                    'width': 3,
                },
                'fillcolor': 'rgba(50, 171, 96, 0.6)',
            },
        ]
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