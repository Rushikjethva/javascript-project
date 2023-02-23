let In = 5;
var data = [];


function Add() {

    var table = document.getElementById('table');
    var Row = table.insertRow(-1);

    var Ce0 = Row.insertCell(0);
    var Ce1 = Row.insertCell(1);
    var Ce2 = Row.insertCell(2);
    var Ce3 = Row.insertCell(3);
    var Ce4 = Row.insertCell(4);
    var Ce5 = Row.insertCell(5);

    Ce0.innerHTML = `<td><input type="hidden" class="" id="id${In}" value="${In+1}"/>${In+1}</td>`;
    Ce1.innerHTML = `<td><input type="text" class="namearr" placeholder="Name" id="name${In}" onkeypress="return validationAlphabets(event,this);"></td>`;
    Ce2.innerHTML = ` <td><input type="text" class="" placeholder="Subject" id="subject${In}" onkeypress="return validationAlphabets(event,this);" ></td>`;
    Ce3.innerHTML = `<td><input type="number" class="" placeholder="Mark" id="mark${In}"></td>`;
    Ce4.innerHTML = `<td><button type="button" class="btn btn-outline-success " onclick="pass(this)" id="p">P</button><button type="button" class="btn  btn-outline-danger ms-1" onclick="fail(this)" id="f">F</button></td>`;
    Ce5.innerHTML = `<td><button type="button" class="btn btn-danger " onclick="Remove(${In++})" onkeyup="onlyNumber(this)">-</button></td>`;

}

async function Remove(a) {
    // console.log(a);
    var result = await swal("Are you sure? Delete Record", {
        buttons: ["Cancle", true],
    });
    if (result) {
        document.getElementById("table").deleteRow(-1);
        In--;
        for (var i = 1; i < table.rows.length; i++) {
            table.rows[i].cells[0].innerHTML = i;
            // console.log(In);
        }
        save();
    }
}


function save() {

document.getElementById("table1").innerHTML="";
    document.getElementById("table1").style.display = "block";

    data = []
    for (var i = 0; i < In; i++) {


        var value2 = document.getElementById("name".concat(i)).value;
        var value3 = document.getElementById("subject".concat(i)).value;
        var value4 = document.getElementById("mark".concat(i)).value;
        var passbtn = document.querySelectorAll("#p");
       if(passbtn[i].classList.value=="btn btn-success"){

            data.push({
                "id": i + 1,
                "name": value2,
                "subject": value3,
                "mark": Number(value4)
            });
       }
        
    }
    // console.log(data)
      if(validation()){
        return 
      }
      percentage();
      displayData();

}


function displayData() {
    // console.log(data);
    document.getElementById("table1").style.display = "block";
    document.getElementById("table2").style.display = "none";
    var table = document.getElementById("table1");
    table.innerHTML = ""
    var tab = `<table class='table table-responsive table-bordered  border-light showtablebg zoom'><thead><tr><th>ID</th><th>Name</th><th>Subject</th><th>Mark</th></tr></thead><tbody ></tbody>`;
    for (var i = 0; i < data.length; i++) {
        if (data[i]['mark'] < 33) {
            tab += `<tr style="background:#cd5554">`;
        } 
        else {
            tab += `<tr >`;
        }
        tab += "<td>" + data[i]['id'] + "</td>";
        tab += "<td>" + data[i]['name'] + "</td>";
        tab += "<td>" + data[i]['subject'] + "</td>";
        tab += "<td >" + data[i]['mark'] + "</td>";
        tab += "</tr>";
    }
    table.innerHTML = tab;
}
function validationAlphabets(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        } else if (e) {
            var charCode = e.which;
        } else {
            return true;
        }
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
            return true;
        else
            return false;
    } catch (errmsg) {
        alert(errmsg.Description);
    }

}


function searchFun() {
    document.getElementById("table1").style.display = "none";
    document.getElementById("table2").style.display = "block";
    document.getElementById("table2").innerHTML = ''
    var ser = document.getElementById("search").value;
    var tab = "<table class='table table-responsive showtablebg'><thead><tr><td>ID</td><td>Name</td><td>Subject</td><td>Mark</td></tr></thead><tbody></tbody>";
    for (var i = 0; i < data.length; i++) {
        if (ser.toLowerCase() == data[i]['name'].toLowerCase()) {
            tab += "<tr>";
            tab += "<td>" + data[i]['id'] + "</td>";
            tab += "<td>" + data[i]['name'] + "</td>";
            tab += "<td>" + data[i]['subject'] + "</td>";
            tab += "<td>" + data[i]['mark'] + "</td>";
            tab += "</tr>";
        }
    }
    document.getElementById("table2").innerHTML = tab;
    if (ser == "" || (ser == " ")) {
        displayData();
    }
}

document.querySelector("#select").addEventListener("change", sortTable)

function sortTable() {
    console.log("changed");
    temp = data
    temp2 = data
        // sort by Name

    temp.sort(function(a, b) {
        if (a.name < b.name) {
            return -1;
        }
    });
    var tab = `<h3 class='fcolor'>Sort By Name</h3>
    <table class='table sortTableBg'><thead><tr><td>ID</td><td>Name</td><td>Subject</td><td>Mark</td></tr></thead><tbody></tbody>`;
    for (var i = 0; i < temp.length; i++) {
        tab += "<tr>";
        tab += "<td>" + temp[i]['id'] + "</td>";
        tab += "<td>" + temp[i]['name'] + "</td>";
        tab += "<td>" + temp[i]['subject'] + "</td>";
        tab += "<td>" + temp[i]['mark'] + "</td>";
        tab += "</tr>";
    }
    document.getElementById("table3").innerHTML = tab;


    // sort by subject

    temp2.sort(function(a, b) {
        if (a.subject < b.subject) {
            return -1;
        }

    });
    var tab = `<h3 class='fcolor'>Sort By Subject </h3><table class='table sortTableBg'><thead><tr><td>ID</td><td>Name</td><td>Subject</td><td>Mark</td></tr></thead><tbody></tbody>`;
    for (var i = 0; i < temp.length; i++) {
        tab += "<tr>";
        tab += "<td>" + temp2[i]['id'] + "</td>";
        tab += "<td>" + temp2[i]['name'] + "</td>";
        tab += "<td>" + temp2[i]['subject'] + "</td>";
        tab += "<td>" + temp2[i]['mark'] + "</td>";
        tab += "</tr>";
    }
    document.getElementById("table4").innerHTML = tab;
    // document.getElementById("table4").innerHTML = tab;
    //   console.log(temp);
    document.getElementById("table1").style.display = "none";
}


function onlyNumber(m) {
    if (m.value < 0 || m.value > 100) {
        se.disabled = true;
        alert("Please enter Valid number")
    } else {
        se.disabled = false;
    }
}

function percentage() {
     // debugger;
    let allNamesarr =document.querySelectorAll('.namearr')
    // console.log(allNamesarr);
    let allNames=[]
    for (let i = 0; i < allNamesarr.length; i++) {
         allNames[i] = allNamesarr[i].value;
        
    }
    // console.log(allNames);
    const uniquenamesarr = new Set(allNames)
   
    let nameCount=[]
    Array.from(uniquenamesarr).forEach((uniquename,nameindex)=>{
        // console.log(uniquename,nameindex);
        count= 0
        allNames.forEach((dname)=>{
         
            if (uniquename==dname) {
                count++
                nameCount[nameindex]=count
            }
        })
    })
    console.log(uniquenamesarr);
    console.log(nameCount);
   
   
    var newObj = {};
    data.forEach(function(d) {
        if (newObj.hasOwnProperty(d.name)) {
            newObj[d.name] = newObj[d.name] + d.mark;

        } else {
            newObj[d.name] = d.mark;
        }
     
    });
    // console.log(newObj);
    var newArray = [];

    for (var dp in newObj) {
        newArray.push({
            name: dp,
            mark: newObj[dp]
        });
    }

    console.log(newArray);

    var index=0;
    var table = document.getElementById("table5");

    var tab = `<table class='table table-responsive table-bordered  border-light showtablebg'><thead><tr><th>ID</th><th>Name</th><th>Persantag</th></tr></thead><tbody ></tbody>`;
    for (var i = 0; i < newArray.length; i++) {
        tab += "<td>" + (index + 1) + "</td>";
        tab += "<td>" + newArray[i]['name'] + "</td>";
        tab += "<td>" + newArray[i]['mark']/nameCount[i] +"%"+ "</td>";
        tab += "</tr>";
        index++;
    }
    table.innerHTML = tab;
}

function pass(abc){
    abc.setAttribute("class","btn btn-success")
    abc.nextElementSibling.setAttribute("class","btn btn-outline-danger");  

}


function fail(xyz){
    xyz.setAttribute("class","btn btn-danger")
    xyz.previousElementSibling.setAttribute("class","btn btn-outline-success");  
}


function validation(){
    const table = document.getElementById("table");
    var tData = table.querySelectorAll("input");
    for (var i = 0; i < tData.length;i++) {
        if(tData[i].value == ""){
            console.log(tData[i]);
            swal("Please Enter Field first Which you put Empty")
            return true;
        }
    }
    return false;

}

