const site_name = "https://app.limbicarc.com/";
var curr_tab;

function send_data(data){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: data}, function(response) {
          console.log(response.farewell);
        });
      });
}

function set_curr_tab(url) {
    curr_tab = url;
}

function reload_tab(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
      });
}

function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    chrome.tabs.query(queryOptions, function (tabs) {
        set_curr_tab(tabs[0].url);
    });
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

function openInNewTab(url) {
    window.open(url, '_blank').focus();
}

function set_modal_html() {
    document.querySelector("body").innerHTML = modal_html;
    document.querySelector("body").innerHTML = document.querySelector("body").innerHTML + modal_for_list;
    init_modal();
    init_modal_for_list();
}

function init() {
    getCurrentTab();
    setTimeout(function () {
        if (check_if_the_site_is_same(curr_tab)) {
            set_modal_html();
        }
    }, 1000);

    //creates a new link and clicks on it
    document.querySelector("body > a").onclick = function () {
        Object.assign(document.createElement('a'), {
            target: '_blank',
            href: 'https://app.limbicarc.com/infoboost-activations',
        }).click();
    };
}
function init_modal() {
    // Get the modal
    var modal = document.getElementById("choose_limit_modal");

    // Get the element that closes the modal
    var close_button = document.getElementById("modal_close");

    //Get the button that send the value
    var edit_button = document.getElementById("modal_send");


    if (window.localStorage.getItem("limit_var")) {
        document.getElementById("limit_text_box").value = window.localStorage.getItem("limit_var");
    } else {
        document.getElementById("limit_text_box").value = 70;
    }

    if (window.localStorage.getItem("time_var")) {
        document.getElementById("time_text_box").value = window.localStorage.getItem("time_var");
    } else {
        document.getElementById("time_text_box").value = 6;
    }

    // When the user clicks on Cancel, close the modal
    close_button.onclick = function () {
        modal.remove();
        location.reload();
    }

    edit_button.onclick = function () {
        //send the data to the database
        var limit_variable = document.getElementById("limit_text_box").value;
        window.localStorage.setItem("limit_var", limit_variable);
        var time_variable = document.getElementById("time_text_box").value;
        window.localStorage.setItem("time_var", time_variable);
        send_data([limit_variable,time_variable,null]);
        reload_tab();
        location.reload();
    }
}
function init_modal_for_list() {
    // Get the modal
    var modal = document.getElementById("choose_limit_modal_list");

    // Get the element that closes the modal
    var close_button = document.getElementById("modal_close_list");

    //Get the button that send the value
    var edit_button = document.getElementById("modal_send_list");

    if (window.localStorage.getItem("list_var")) {
        document.getElementById("limit_text_box_list").value = window.localStorage.getItem("list_var");
    } else {
        document.getElementById("limit_text_box_list").value = "Acetyl-L-Carnitine;Creatine";
    }

    // When the user clicks on Cancel, close the modal
    close_button.onclick = function () {
        modal.remove();
        location.reload();
    }

    edit_button.onclick = function () {
        //send the data to the database
        var list_var = document.getElementById("limit_text_box_list").value;
        window.localStorage.setItem("list_var", list_var);
        send_data([null,null,list_var]);
        reload_tab();
        modal.remove();
        location.reload();
    }
}
window.onload = init;


var modal_html = `
<style>
.modal_limit
 {
    display: block; /* Hidden by default */
    /*position: fixed;  Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 20px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
  .modal-content_limit
 {
    position: relative;
    background-color: #E0E0E0;
    margin:auto;
    margin-left:0;
    padding: 0;
    border: 1px solid #888;
    width: 25%;
    min-width: 233px;
    max-width: 300px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
  }
  .modal-body_limit 
  {
      padding: 2px 16px;
  }
  .input_text_type
{
    /*code to make the text into vertically centered*/
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    width: 100%;
    height: 40px;
    border: 1px solid #696969;
    background-color: #f1efef;
    border-radius: 10px;
}
.modal_buttons{
    display: flex;
    justify-content:space-between;
}
/*the close button*/
.close_limit
{
  color: #000;
  font-size: 28px;
  font-weight: bold;
}
.close_limit:hover,
.close_limit:focus 
{
  color: #888;
  text-decoration: none;
  cursor: pointer;
}

 /* The Edit Button */
 .send_edit
 {
   color: #000;
   font-size: 28px;
   font-weight: bold;
 }
 
 .send_edit:hover,
 .send_edit:focus 
 {
   color: #888;
   text-decoration: none;
   cursor: pointer;
 }
</style>
<div id="choose_limit_modal" class="modal_limit">

<!-- Modal content -->
<div class="modal-content_limit">
    <div class="modal-body_limit">
        <div class="general_div">
            <label>What percentage is the limit?</label>
            <input class="input_text_type" id="limit_text_box"></p>
        </div>
        <div class="general_div">
            <label>how many days?</label>
            <input class="input_text_type" id="time_text_box"></p>
        </div>
        <div class="buttons_div modal_buttons" style="display: flex; margin-top: -5%;">
            <p id="modal_send" class="send_edit" style="float: left;">Start</p>
            <p id="modal_close" class="close_limit" style="float: right; margin-left: 50px;">Cancel</p>					
        </div>
    </div>
</div>
</div>`;

var modal_for_list = `
<style>
.modal_limit
 {
    display: block; /* Hidden by default */
    /*position: fixed;  Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 20px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
  .modal-content_limit
 {
    position: relative;
    background-color: #E0E0E0;
    margin:auto;
    margin-left:0;
    padding: 0;
    border: 1px solid #888;
    width: 25%;
    min-width: 233px;
    max-width: 300px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
  }
  .modal-body_limit 
  {
      padding: 2px 16px;
  }
  .input_text_type
{
    /*code to make the text into vertically centered*/
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    width: 100%;
    height: 40px;
    border: 1px solid #696969;
    background-color: #f1efef;
    border-radius: 10px;
}
.modal_buttons{
    display: flex;
    justify-content:space-between;
}
/*the close button*/
.close_limit
{
  color: #000;
  font-size: 28px;
  font-weight: bold;
}
.close_limit:hover,
.close_limit:focus 
{
  color: #888;
  text-decoration: none;
  cursor: pointer;
}

 /* The Edit Button */
 .send_edit
 {
   color: #000;
   font-size: 28px;
   font-weight: bold;
 }
 
 .send_edit:hover,
 .send_edit:focus 
 {
   color: #888;
   text-decoration: none;
   cursor: pointer;
 }
</style>
<div id="choose_limit_modal_list" class="modal_limit">

<!-- Modal content -->
<div class="modal-content_limit">
    <div class="modal-body_limit">
        <div class="general_div">
            <label>irj be minded összetevőt ;-vel elválasztva!</label>
            <input class="input_text_type" id="limit_text_box_list"></p>
        </div>
        <div class="buttons_div modal_buttons" style="display: flex; margin-top: -5%;">
            <p id="modal_send_list" class="send_edit" style="float: left;">Start</p>
            <p id="modal_close_list" class="close_limit" style="float: right; margin-left: 50px;">Cancel</p>					
        </div>
    </div>
</div>
</div>`;