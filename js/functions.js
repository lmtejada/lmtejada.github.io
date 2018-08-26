var dataset_deptos;

let promise_deptos = new Promise((resolve, reject) => {
    d3.csv("data/departamentos.csv", function (data) {
        dataset_deptos = data;
        resolve(data);
    });
});

var dataset_transport;

let promise_transport = new Promise((resolve, reject) => {
    d3.csv("data/transport.csv", function (data) {
        dataset_transport = data;
        resolve(data);
    });
});

var dataset_weapon;

let promise_weapon = new Promise((resolve, reject) => {
    d3.csv("/data/weapon.csv", function (data) {
        dataset_weapon = data;
        resolve(data);
    });
});

function cleanCanvas(element) {
    d3.select(element).html(null);
}

function createBubleChart(data, element) {
    cleanCanvas(element);
    dataset = {
        "children": data
    };

    var diameter = 600;
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var bubble = d3.pack(dataset)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select(element)
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble")
        .attr("class", "deptos");

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("color", "white")
        .style("padding", "8px")
        .style("background-color", "rgba(0, 0, 0, 0.75)")
        .style("border-radius", "6px")
        .style("font", "14px sans-serif")

    var nodes = d3.hierarchy(dataset)
        .sum(function (d) {
            return d.Conteo;
        });

    var node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function (d) {
            return !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function (d) {
            return d.Departamento;
        });

    node.append("circle")
        .attr("r", function (d) {
            return d.r;
        })
        .style("fill", function (d, i) {
            return color(i);
        })
        .style('pointer-events', 'all')
        .style('cursor', 'pointer');


    node.selectAll('circle')
        .on("mouseover", function (d) {
            tooltip.text(`${d.data.Departamento}: ${d.data.Conteo}`);
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function () {
            return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.Departamento.substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function (d) {
            return d.r / 5;
        })
        .attr("fill", "white");

    d3.select(self.frameElement)
        .style("height", diameter + "px");
}

function createBubleChartIntensity(data, element) {
    cleanCanvas(element);
    dataset = {
        "children": data
    };

    var diameter = 600;

    var bubble = d3.pack(dataset)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select(element)
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble")
        .attr("class", "intensity");

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("color", "white")
        .style("padding", "8px")
        .style("background-color", "rgba(0, 0, 0, 0.75)")
        .style("border-radius", "6px")
        .style("font", "14px sans-serif");

    var nodes = d3.hierarchy(dataset)
        .sum(function (d) {
            return d.Poblacion;
        });

    var node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function (d) {
            return !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function (d) {
            return d.Departamento;
        });

    node.append("circle")
        .attr("r", function (d) {
            return d.r;
        })
        .style("fill", function (d, i) {
            if (d.data.Proporcion <= 0.25) {
                return '#40CC5C';
            } else {
                return '#F22400'
            }
        })
        .style('pointer-events', 'all')
        .style('cursor', 'pointer');


    node.selectAll('circle')
        .on("mouseover", function (d) {
            tooltip.text(`${d.data.Departamento}: ${d.data.Conteo}`);
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function () {
            return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.Departamento.substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function (d) {
            return d.r / 5;
        })
        .attr("fill", "white");

    d3.select(self.frameElement)
        .style("height", diameter + "px");
}

function createScatterPlot(data, element) {
    cleanCanvas(element);

    let length = 650,
        svg = d3.select(element)
            .append("svg")
            .attr("width", length)
            .attr("height", length),
        margin = { top: 20, right: 20, bottom: 30, left: 50 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    color = d3.scaleOrdinal(d3.schemeCategory20);

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("color", "white")
        .style("padding", "8px")
        .style("background-color", "rgba(0, 0, 0, 0.75)")
        .style("border-radius", "6px")
        .style("font", "14px sans-serif");

    g.append("g")
        .attr("class", "x axis");

    g.append("g")
        .attr("class", "y axis");

    let x = d3.scaleLinear()
        .range([0, width]);

    let y = d3.scaleLinear()
        .range([height, 0]);

    x.domain([0, 11000000]);
    y.domain([0, 44000]);

    let points = g.selectAll(".point")
        .data(data); //update

    pointsEnter = points
        .enter()
        .append("circle")
        .attr("class", "point")
        .style("fill", function (d, i) {
            return color(i);
        })
        .style('pointer-events', 'all')
        .style('cursor', 'pointer');

    d3.selectAll('circle')
        .on("mouseover", function (d) {
            tooltip.text(`${d.Departamento}: ${d.Conteo}`);
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function () {
            return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });

    points.merge(pointsEnter) //Enter + Update
        .attr("cx", d => x(d.Poblacion))
        .attr("cy", d => y(d.Conteo))
        .attr("r", 5);

    points.exit()
        .remove();

    g.select(".x.axis")
        .call(d3.axisBottom(x))
        .attr("transform",
            "translate(0, " + height + ")");

    g.select(".y.axis")
        .call(d3.axisLeft(y));
}

function createBarChart(data, element) {
    cleanCanvas(element);

    let length = 650,
        svg = d3.select(element)
            .append("svg")
            .attr("width", length)
            .attr("height", length),
        margin = { top: 20, right: 20, bottom: 70, left: 60 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("color", "white")
        .style("padding", "8px")
        .style("background-color", "rgba(0, 0, 0, 0.75)")
        .style("border-radius", "6px")
        .style("font", "14px sans-serif");

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function (d) { return d.Movil_agresor; }));
    y.domain([0, 130000]);

    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-25)");

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y).ticks(5))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.Movil_agresor); })
        .attr("y", function (d) { return y(d.Conteo); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.Conteo); })
        .style('pointer-events', 'all')
        .style('cursor', 'pointer');


    d3.selectAll('rect')
        .on("mouseover", function (d) {
            tooltip.text(`${d.Movil_agresor}: ${d.Conteo}`);
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function () {
            return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });
}

function createDonutChart(data, element) {
    cleanCanvas(element);

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("color", "white")
        .style("padding", "8px")
        .style("background-color", "rgba(0, 0, 0, 0.75)")
        .style("border-radius", "6px")
        .style("font", "14px sans-serif");

    let diameter = 600,
        svg = d3.select(element)
            .append("svg")
            .attr("width", diameter)
            .attr("height", diameter),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scaleOrdinal(["#6b486b", "#7b6888", "#AEC7E8", "#a05d56", "#d0743c", "#ff8c00", "#98abc5", "#FF9896", "#8a89a6"]);

    var pie = d3.pie()
        .sort(null)
        .value(function (d) { return d.Conteo; });

    var path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 70);

    var label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var arc = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")
        .style('pointer-events', 'all')
        .style('cursor', 'pointer');

    arc.append("path")
        .attr("d", path)
        .attr("fill", function (d, i) { return color(i); });

    arc.append("text")
        .attr("transform", function (d) { return "translate(" + label.centroid(d) + ")"; })
        .attr("dy", ".50em")
        .style("font", "16px sans-serif")
        .style("color", "white")
        .text(function (d) {
            if (d.data.Porcentaje > 10) {
                return Math.round(d.data.Porcentaje);
            } else {
                return '';
            }
        });

    d3.selectAll('.arc')
        .on("mouseover", function (d) {
            tooltip.text(`${d.data.Arma_empleada}: ${d.data.Conteo}`);
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function () {
            return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });
}

function doStep(step) {
    d3.selectAll('.tooltip').remove();
    switch (step) {
        case '1':
            promise_deptos.then((dataset) => {
                createBubleChart(dataset, this);
            });
            break;
        case '2':
            createBubleChartIntensity(dataset_deptos, this);
            break;
        case '3':
            createScatterPlot(dataset_deptos, this);
            break;
        case '4':
            promise_weapon.then((dataset) => {
                createDonutChart(dataset, this);
            });
            break;
        case '5':
            promise_transport.then((dataset) => {
                createBarChart(dataset, this);
            });
            break;
        default:
            break;
    }
}