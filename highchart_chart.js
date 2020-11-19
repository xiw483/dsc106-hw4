const KNIFE_PRICE = 6.25;
const FORK_PRICE = 4.99;
const ZERO_FORMAT = '0.00';
var id = 1;

document.getElementById("knife_price").value = KNIFE_PRICE;
document.getElementById("fork_price").value = FORK_PRICE;

var num_sales = 0.00;
var num_knife = 0;
var num_fork = 0;

localStorage.setItem("num_fork",num_fork);
localStorage.setItem("num_knife", num_knife)

var first_two = generateEntries();

let store = {
    orderHistory: []
};

function getPct () {
    f = localStorage.getItem("num_fork");
    k = localStorage.getItem("num_knife");
    return [f/(f+k), k/(f+k)]
}


var global_pie;
renderPieChart();

function renderPieChart () {
    var pie = Highcharts.chart('pie_container', {
        chart: { type: 'pie' },
        title: { text: 'Sales Ratio for Forks and Knives Overall' },
        
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                    distance: -50,
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 4
                    }
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Items',
            colorByPoint: true,
            data: [{
                name: 'Fork',
                data: 0.375
            }, {
                name: 'Knife',
                data: 0.625
            }]
        }]
    });
    global_pie=pie;
}

document.getElementById("order_btn").addEventListener('click', function(event) {
    global_pie.series[0].setData([{y:getPct()[0]}, {y:getPct()[1]}])
})

var globalBar;
renderBarChart();

function renderBarChart() {
    var bar = Highcharts.chart('bar_container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Number of Forks and Knives Sold per Order'
        },
        xAxis: {
            categories: ['1', '2']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total Sales'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Knife',
            data: [1, 2]
        }, {
            name: 'Fork',
            data: [1, 4]
        }]
    });
    globalBar = bar;
}
document.getElementById("order_btn").addEventListener('click', function(event) {
    globalBar.xAxis[0].categories.push(id)
    globalBar.series[0].addPoint([
        document.getElementById("knife_input"),
        document.getElementById("fork_input")
    ])
})


let initialize = 1;
function generateEntries() {
    // Returns an orderHistory array
    // [ID#, Date, Knife quantity, Fork quantity]
    return [
        [1, '10/19/2020', 1, 1, 'Paypal'],
        [2, '10/20/2020', 2, 4, 'Visa']
    ]
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
    localStorage.setItem('num_sales', num_sales)
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
    arr[4] = payment_method;

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


