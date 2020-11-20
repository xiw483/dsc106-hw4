const KNIFE_PRICE = 6.25;
const FORK_PRICE = 4.99;
const ZERO_FORMAT = '0.00';
var id = 1;

document.getElementById("knife_price").value = KNIFE_PRICE;
document.getElementById("fork_price").value = FORK_PRICE;

var num_sales = 0.00;
var num_knife = 0;
var num_fork = 0;

var first_two = generateEntries();

let store = {
    orderHistory: []
};

let initialize = 1;
function generateEntries() {
    // Returns an orderHistory array
    // [ID#, Date, Knife quantity, Fork quantity]
    return [
        [1, '10/19/2020', 1, 2, 'Paypal'],
        [2, '10/20/2020', 3, 3, 'Visa']
    ]
}

function getPct() {
    f = localStorage.getItem("num_fork");
    k = localStorage.getItem("num_knife");
    if (f == 0 & k == 0) {
        return [1, 1]
    }
    else {
        return [Number(f) / (Number(f) + Number(k)), Number(k) / (Number(f) + Number(k))]
    }
}

function updatePie() {

    document.getElementById("pie").innerHTML = ""

    var height = parseInt(d3.select('#pie').style('height'))
    var width = parseInt(d3.select('#pie').style('width'))
    var radius = Math.min(width, height) / 2

    var color = d3.scaleOrdinal(['#206db0', '#ff6361']);
    var data = [getPct()[0], getPct()[1]];

    var svgPie = d3.select("#pie")
        .attr("width", '100%')
        .attr("height", "100%")
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .attr('preserveAspectRatio', 'xMinYMin')

    var g = svgPie
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    var pie = d3.pie();

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    var arcs = g.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc")

    arcs.append("path")
        .attr("fill", function (d, i) {
            return color(i);
        })
        .attr("d", arc);

    var keys = ["Fork", "Knife"]
    var size = 20

    arcs.append("text")
        .attr("transform", function(d) {
            d.innerRadius=0;
            d.outerRadius=radius;
            return "translate(" +arc.centroid(d) +")"
        })
        .attr("text-anchor", "middle")
        .text(function(d,i) {
            return data[i].toFixed(2)
        })
    
    svgPie.append("circle")
        .attr("cx", 50)
        .attr("cy", 180)
        .attr("r",6)
        .style("fill", '#ff6361')
    svgPie.append("circle")
        .attr("cx", 50)
        .attr("cy", 160)
        .attr("r",6)
        .style("fill", '#206db0')
    svgPie.append("text")
        .attr("x", 60)
        .attr("y", 180)
        .text("Knife")
        .style("fill", '#ff6361')
        .style("font-size", "12px")
        .attr("alignment-baseline","middle")
    svgPie.append("text")
        .attr("x", 60)
        .attr("y", 160)
        .text("Fork")
        .style("fill", '#206db0')
        .style("font-size", "12px")
        .attr("alignment-baseline","middle")
}

function tot_price(arr) {
    return (arr[2] * KNIFE_PRICE + arr[3] * FORK_PRICE).toFixed(2);
}

function insert_data(arr) {
    var sales = tot_price(arr);
    var data = Array.from(arr);
    data.splice(4, 0, "$" + sales)

    num_sales += Number(sales);
    num_knife += Number(data[2]);
    num_fork += Number(data[3]);
    document.getElementById("num_sales").innerHTML = num_sales.toFixed(2);
    document.getElementById("num_knife").innerHTML = num_knife;
    document.getElementById("num_fork").innerHTML = num_fork;

    var table = document.getElementById('order_tbl').getElementsByTagName('tbody')[0];
    var tr = table.insertRow()
    for (let i = 0; i < data.length; i++) {
        var cell = tr.insertCell(i);
        cell.innerHTML = data[i];
    }

    store.orderHistory.push(arr)
    localStorage.setItem('order_history', store.orderHistory)
    id++;
    localStorage.setItem('order_id', id);
    localStorage.setItem('num_fork', num_fork)
    localStorage.setItem('num_knife', num_knife)

    updatePie();
}

function check_form() {
    const knife_input = document.getElementById("knife_input").value;
    const fork_input = document.getElementById("fork_input").value;
    var cansubmit = knife_input > 0 || fork_input > 0;
    document.getElementById("order_btn").disabled = !cansubmit;
}

function update_form() {
    var knife_total_price = (document.getElementById("knife_input").value * KNIFE_PRICE).toFixed(2);
    var fork_total_price = (document.getElementById("fork_input").value * FORK_PRICE).toFixed(2);
    document.getElementById("knife_total_price").value = knife_total_price;
    document.getElementById("fork_total_price").value = fork_total_price;
    document.getElementById("total_price").value = (Number(knife_total_price) + Number(fork_total_price)).toFixed(2);
}

function order() {
    var arr = new Array(4);

    var order_id = localStorage.getItem("order_id");

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var date = mm + '/' + dd + '/' + yyyy;

    const knife_input = document.getElementById("knife_input").value;
    const fork_input = document.getElementById("fork_input").value;

    var payment_method = document.getElementById("payment").value;

    arr[0] = order_id;
    arr[1] = date;
    arr[2] = knife_input;
    arr[3] = fork_input;
    arr[4] = payment_method;;

    insert_data(arr);
    clear_field();
}

function clear_field() {
    document.getElementById("knife_input").value = 0;
    document.getElementById("fork_input").value = 0;
    document.getElementById("knife_total_price").value = 0.00;
    document.getElementById("fork_total_price").value = 0.00;
    document.getElementById("total_price").value = 0.00;
    document.getElementById("payment").value = null;
    document.getElementById("order_btn").disabled = "disabled";
}

var order_history = localStorage.getItem("order_history");

if (order_history == null) {
    insert_data(first_two[0]);
    insert_data(first_two[1]);
}
else {
    for (let i = 0; i < order_history.length / 5; i += 5) {
        insert_data(order_history.split(',').slice(i, i + 5));
    }
}


