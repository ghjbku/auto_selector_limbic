const site_name = "https://app.limbicarc.com/";


function get_data() {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.greeting) {
                var which=set_storage(request.greeting);
                if (which ==0){
                    console.log(sessionStorage.getItem("limit_var")+" "+sessionStorage.getItem("time_var"));
                }else if (which == 1){
                    console.log(sessionStorage.getItem("list_var"));
                }
            }
        }
    );
}

function fetch_url() {
    return document.location.href;
}

function set_storage(table){
    if(!table[0] || !table[1]){
        var edited = table[2].replace(/;$/, "");
        window.sessionStorage.setItem('list_var',edited);
        return 1;
    }
    if(!table[2]){
        window.sessionStorage.setItem('limit_var',table[0]);
        window.sessionStorage.setItem('time_var',table[1]);
        return 0;
    }
}

//pre-define the dummy variable used to check if the site has to reload or not
var limit_variable, time_variable, list_var;

if (window.sessionStorage.getItem('limit_var')) {
    set_value("limit_var");
}
if (window.sessionStorage.getItem('time_var')) {
    set_value("time_var");
}
if (window.sessionStorage.getItem('list_var')) {
    set_value("list_var");
}

//set the pre-defined "reloaded" variable's value to be the one stored in the sessionStorage 
function set_value(name) {
    if (name == "limit_var") {
        limit_variable = window.sessionStorage.getItem("limit_var");
    }
    if (name == "time_var") {
        time_variable = window.sessionStorage.getItem("time_var");
    }
    if (name == "list_var") {
        list_var = window.sessionStorage.getItem("list_var");
    }
}

function click_on_radio_button(val) {
    var table = document.querySelector(".search-list").childNodes;
    for (let i = 1; i < table.length; i++) {
        if (table[i].childNodes[1].innerText.startsWith(val)) {
            table[i].childNodes[1].childNodes[3].click();
            console.log(table[i].childNodes[1].childNodes[3].childNodes[2].className);
        }
    };

}

function put_value_and_search(val) {
    console.log(val);
    var search_box = document.querySelector("form.ng-untouched:nth-child(1) > input:nth-child(1)");
    var search_button = document.querySelector("i.fa:nth-child(2)");
    search_box.value = val;
    search_button.click();
    click_on_radio_button(val);
}

function start_the_search() {
    console.log("searching");
    var original = window.sessionStorage.getItem("list_var");
    var splitted = original.split(";");
    for (var i = 0; i < splitted.length; i++) {
        put_value_and_search(splitted[i].replace(/^\s/, ""));
    }
}

function call_modal() {
    if (!sessionStorage.getItem('list_var')) {
        return;
    } else {
        setTimeout(start_the_search, 3000);
    }
}

function click_list() {
    setTimeout(function () {
        console.log("timed");
        document.querySelector("#mat-expansion-panel-header-1").click();
        setTimeout(function () { document.querySelector("#ngb-nav-1").click(); }, 200);
        setTimeout(function () { call_modal(); }, 210);
    }, 1500);
}



function check_if_the_site_is_same(url) {
    if (url.toString().startsWith(site_name)) {
        return true;
    }
    else {
        console.log("site name not the same");
        /*try again after 30 seconds
        setTimeout(init, 30000);*/
    }
}

function check_if_on_sparkscan() {
    if (fetch_url().toString().includes("sparkscanid")) {
        if (!sessionStorage.getItem('limit_var')) {
            return;
        } else {
            document.querySelector("#mat-expansion-panel-header-0").click();
            var time_table = document.querySelector(".duration-infoboosts > ul:nth-child(1)").childNodes;
            time_table[time_variable].childNodes[1].childNodes[0].click();
            document.querySelector("#mat-expansion-panel-header-0").click();
            setTimeout(start_ticking, 2000);
        }
    }
    else {
        check_if_on_library_creation();
    }
}

function check_if_on_library_creation() {
    if (fetch_url().toString().includes("custominfoboosts")) {
        click_list();
    } else {
        setTimeout(check_if_on_sparkscan, 4000);
    }
}

function loop_through_the_nodes(table) {
    console.log("in the loop");
    for (let i = 1; i < table.length; i++) {
        if ((parseInt(table[i].childNodes[0].childNodes[1].textContent) >= limit_variable) &&
            table[i].childNodes[1].firstElementChild.currentSrc.endsWith("/blue-minus.png")) {
            table[i].childNodes[1].click();
        }
    };

}

function start_ticking() {
    document.querySelector("#mat-expansion-panel-header-3").click();
    setTimeout(function () {
        document.querySelector("#ngb-nav-1").click();
    }, 1000);
    var table = document.querySelector("ul.ingredients-row:nth-child(2) > div:nth-child(1)").childNodes;
    setTimeout(function () { loop_through_the_nodes(table); }, 1500);
}

function init() {
    if (check_if_the_site_is_same(fetch_url())) {
        console.log("on the site");
        get_data();
        check_if_on_sparkscan();
    }
}

window.onload = init;