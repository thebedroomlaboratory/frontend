angular.module('d3.directives', ['d3'])
    .directive('d3Bars', ['d3Service', '$window',
        function (d3Service, $window) {
            return {
                restrict: 'EA',
                scope: {},
                link: function (scope, element, attrs) {

                    var margin = parseInt(attrs.margin) || 20,
                        barHeight = parseInt(attrs.barHeight) || 20,
                        barPadding = parseInt(attrs.barPadding) || 5;

                    d3Service.d3().then(function (d3) {
                        var svg = d3.select(element[0])
                            .append("svg")
                            .style('width', '100%');

                        window.onresize = function () {
                            scope.$apply();
                        };

                        // hard-code data
                       /* scope.data = [{
                            name: "Greg",
                            score: 98
                        }, {
                            name: "Ari",
                            score: 96
                        }, {
                            name: 'Q',
                            score: 75
                        }, {
                            name: "Loser",
                            score: 48
                        }, {
                            name: "ted",
                            score: 100
                        }];
                        */

                        // Watch for resize event
                        scope.$watch(function () {
                            return angular.element($window)[0].innerWidth;
                        }, function () {
                            scope.render(scope.data);
                        });

                        scope.render = function (data) {
                                // remove all previous items before render
                                svg.selectAll('*').remove();

                                // If we don't pass any data, return out of the element
                                if (!data) return;

                                // setup variables
                                var width = d3.select(element[0]).node().offsetWidth - margin,
                                    // calculate the height
                                    height = scope.data.length * (barHeight + barPadding),
                                    // Use the category20() scale function for multicolor support
                                    color = d3.scale.category20(),
                                    // our xScale
                                    xScale = d3.scale.linear()
                                    .domain([0, d3.max(data, function (d) {
                                        return d.score;
                                    })])
                                    .range([0, width]);

                                // set the height based on the calculations above
                                svg.attr('height', height);

                                //create the rectangles for the bar chart
                                svg.selectAll('rect')
                                    .data(data).enter()
                                    .append('rect')
                                    .attr('height', barHeight)
                                    .attr('width', 140)
                                    .attr('x', Math.round(margin / 2))
                                    .attr('y', function (d, i) {
                                        return i * (barHeight + barPadding);
                                    })
                                    .attr('fill', function (d) {
                                        return color(d.score);
                                    })
                                    .transition()
                                    .duration(1000)
                                    .attr('width', function (d) {
                                        return xScale(d.score);
                                    });

                                    var texts = svg.selectAll("text")
                                    .data(dataset)
                                    .enter();

                                    texts.append("text")
                                         .text("Hello");
                                         // set position etc.


                                    /*svg.append('text')
                                    .text('this is text');
                                    */

                                    //svg.selectAll('text').text("Hello");

                            } //End of Render
                    });

                }
            }
        }
    ])
    .directive('tempature', ['d3Service', '$window', function (d3Service, $window){
        return {
                restrict: 'EA',
                scope: {
                  data: '='
                },
                link: function (scope, element, attrs) {
                var margin = parseInt(attrs.margin) || 20,
                              barHeight = parseInt(attrs.barHeight) || 20,
                              barPadding = parseInt(attrs.barPadding) || 5;

                d3Service.d3().then(function (d3) {
                  var svg = d3.select(element[0])
                                    .append("svg")
                                    .style('width', '100%');

                  window.onresize = function () {
                    scope.$apply();
                  };
               /* scope.data = [{    name: scope.dname,//"Greg",
                                    score: scope.dvalue
                                }];*/

                // Watch for resize event
                scope.$watch(function () {
                  return angular.element($window)[0].innerWidth;
                }, 
                function () {
                   scope.render(scope.data);
                });

                

                scope.render = function (data) {
                  ////console.log('Johns data', data);
                   // remove all previous items before render
                  svg.selectAll('*').remove();

                  // If we don't pass any data, return out of the element
                  if (!data) return;

                 // //console.log('element[0]).node().offsetWidth', d3.select(element[0]).node().offsetWidth);
                  ////console.log('margin',margin);

                  // setup variables
                  var width = d3.select(element[0]).node().offsetWidth - margin,
                      // calculate the height
                      height = scope.data.length * (barHeight + barPadding),
                      // Use the category20() scale function for multicolor support
                      color = d3.scale.category20(),
                      // our xScale
                      xScale = d3.scale.linear()
                      .domain([0, d3.max(data, function (d) {
                          return d.score;
                      })])
                      .range([0, width]);


                      // set the height based on the calculations above
                      svg.attr('height', height);

                      //create the rectangles for the bar chart
                      svg.selectAll('rect')
                          .data(data).enter()
                          .append('rect')
                          .attr('height', barHeight)
                          .attr('width', 140)
                          .attr('id', function (d, i){

                            //var name = (d.name).replace(/\s+/g, '-').toLowerCase();

                            return 'svg-bar-sensor'+i;
                          })
                          .attr('x', Math.round(margin / 2))
                          .attr('y', function (d, i) {
                              return i * (barHeight + barPadding);
                          })
                          .attr('fill', function (d) {
                              return color(d.score);
                          })
                          .transition()
                          .duration(1000)
                          .attr('width', function (d) {
                              return xScale(d.score);
                          });

                      svg.selectAll("text")
                        .data(data)
                        .enter()
                        .append('text').attr('x', function (d, i){
                          //i++;
                          var bar = angular.element(document.querySelector('#svg-bar-sensor'+i))
                          var attr = bar.attr('x');

                          console.log('xd', d);

                          console.log('xi', i);
                          return new Number(attr)+10;//'20';
                        })
                        .attr('y', function (d, i){
                          //i++;
                          console.log('xd', d);
                          console.log('xi', i);
                          

                          var bar = angular.element(document.querySelector('#svg-bar-sensor'+i))
                          var attr = bar.attr('y');

                          console.log('#svg-bar-sensor'+i+' ')
                          console.log("attr",attr);

                          return new Number(attr)+(15);
                        })//'20')
                        .text(function (data){
                          return data.name+" : "+data.score;
                        }).attr('style', 'font-size:12px;fill:#797777;stroke: #000000; stroke-width:0.1;');




                }
              })

        }
      }
  }]);