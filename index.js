document.onkeydown = updateKey;
document.onkeyup = resetKey;

var server_port = 65432;
var server_addr = "192.168.50.92";   // the IP address of your Raspberry PI

function client(key){
    
    const net = require('net');
    // var input = document.getElementById("message").value;
    
    const client = net.createConnection({ port: server_port, host: server_addr }, () => {
        // 'connect' listener.
        console.log('connected to server!');
        document.getElementById("bluetooth").innerHTML = 'Connected';

        client.write(`${key}\r\n`);
    });
    
    // get the data from the server
    client.on('data', (data) => {
        arr = data.toString().split(',');
        document.getElementById("speed").innerHTML = arr[0];
        document.getElementById("direction").innerHTML = arr[1];
        console.log(data.toString());
        client.end();
        client.destroy();
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });

}

// for detecting which key is been pressed w,a,s,d
function updateKey(e) {

    e = e || window.event;

    if (e.keyCode == '87') {
        // up (w)
        document.getElementById("upArrow").style.color = "green";
        client(87);
        document.getElementById("car").setAttribute("src", "./media/artcar.png")
        document.getElementById("car").style.width = "120px"
        document.getElementById("car").style.height = "200px"
    }
    else if (e.keyCode == '83') {
        // down (s)
        document.getElementById("downArrow").style.color = "green";
        client(83);
        document.getElementById("car").setAttribute("src", "./media/artcar_reverse.png")
        document.getElementById("car").style.width = "120px"
        document.getElementById("car").style.height = "200px"
    }
    else if (e.keyCode == '65') {
        // left (a)
        document.getElementById("leftArrow").style.color = "green";
        client(65);
        document.getElementById("car").setAttribute("src", "./media/artcar_left.png")
        document.getElementById("car").style.width = "200px"
        document.getElementById("car").style.height = "120px"
    }
    else if (e.keyCode == '68') {
        // right (d)
        document.getElementById("rightArrow").style.color = "green";
        client(68);
        document.getElementById("car").setAttribute("src", "./media/artcar_right.png")
        document.getElementById("car").style.width = "200px"
        document.getElementById("car").style.height = "120px"
    }
    else if (e.keyCode == '82') {
        // right (d)
        // document.getElementById("rightArrow").style.color = "green";
        client(82);
    }
    else if (e.keyCode == '70') {
        // right (d)
        // document.getElementById("rightArrow").style.color = "green";
        client(70);
    }
    else if (e.keyCode == '32') {
        // right (d)
        // document.getElementById("rightArrow").style.color = "green";
        client(32);
    }
    // client(parseInt(e.keyCode));
}

// reset the key to the start state 
function resetKey(e) {

    e = e || window.event;

    document.getElementById("upArrow").style.color = "grey";
    document.getElementById("downArrow").style.color = "grey";
    document.getElementById("leftArrow").style.color = "grey";
    document.getElementById("rightArrow").style.color = "grey";
}

// // update data for every 50ms
// function update_data(key){
//     setInterval(function(){
//         // get image from python server
//         client(key);
//     }, 50);
// }
