var Main = (function () {
	// variables
	var ctr = 0;
	var newBarChart, newRadChart, newLinChart, newPolChart;
	// object
	return {
		init: function () {
			Main.offcanvas();
		},

		offcanvas: function () {

			$("body").on("click", "[data-toggle='offcanvas']", function () {
				$(".row-offcanvas").toggleClass("active");
				$(".offcanvas-cover").toggle();
				$("body").toggleClass("freeze");
			});
			$(".offcanvas-cover").click(function () {
				$(".row-offcanvas").removeClass("active");
				$(".offcanvas-cover").hide();
				$(".hamburger input").removeAttr("checked");
				$("body").removeClass("freeze");
			});

		},

		minChart : function (elem, chart) {
        chart.removeClass("stack-wrap");
        elem.removeClass("selected");
        elem.find("canvas").height("auto")
        Main.initChart();
    },

    focusChart : function () {
        $(".chart").on("click", ".chart-elem .chart-head a", function() {
            var _elem = $(this).parents(".chart-elem:eq(0)");
            var _chart = $(this).parents(".chart:eq(0)");

            if (!_elem.hasClass("selected")) {
                _elem.find("canvas").removeAttr("style");
                _chart.find(".chart-elem").addClass("stack").removeClass("selected animated fadeIn");
                _elem.addClass("selected animated fadeIn");

                _chart.addClass("stack-wrap").find(".stack").each(function(index) {
                    var _this = $(this);
                    if(_this.hasClass("selected")) {
                        _this.removeAttr("style");
                    } else {
                        _this.addClass("o_" + (index+1)).removeAttr("style").css({
                            "-webkit-box-ordinal-group" : index+1,
                            "-moz-box-ordinal-group"    : index+1,
                            "-ms-flex-order"            : index+1,
                            "-webkit-order"             : index+1,
                            "order"                     : index+1
                        });
                    }
                });
                _elem.removeClass(function(index, classNames) {
                    var thisClass =  classNames.split(" ");
                    var removeClass = [];
                    $.each(thisClass, function(index, class_name) {
                        if (/o_.*/.test(class_name)) {
                            removeClass.push(class_name);
                        }
                    });
                    return removeClass.join(" ");
                });
                Main.initChart();
            } else {
                Main.minChart(_elem, _chart);
            }
        });
    },

    initChart : function () {

        var barCtx = $("#barChart").get(0).getContext("2d");
        var douCtx = $("#douChart").get(0).getContext("2d");
        var linCtx = $("#linChart").get(0).getContext("2d");
        var polCtx = $("#polChart").get(0).getContext("2d");

        Chart.defaults.global.responsive = true;

        // Bar
        var barData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        try {
            Main.newBarChart.destroy();
        } catch(e) {}
        Main.newBarChart = new Chart(barCtx).Bar(barData);

        // Doughnut
        var douData = [
            {
                value: 300,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Yellow"
            }
        ]
        try {
            Main.newDouChart.destroy();
        } catch(e) {}
        Main.newDouChart = new Chart(douCtx).Doughnut(douData);

        // Line
        var linData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        try {
            Main.newLinChart.destroy();
        } catch(e) {}
        Main.newLinChart = new Chart(linCtx).Line(linData);

        // Polar
        var polData = [
            {
                value: 300,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Yellow"
            },
            {
                value: 40,
                color: "#949FB1",
                highlight: "#A8B3C5",
                label: "Grey"
            },
            {
                value: 120,
                color: "#4D5360",
                highlight: "#616774",
                label: "Dark Grey"
            }

        ];
        try {
            Main.newPolChart.destroy();
        } catch(e) {}
        Main.newPolChart = new Chart(polCtx).PolarArea(polData);
    },


		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Main.init);
