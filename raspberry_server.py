import picar_4wd as fc

import socket

HOST = "192.168.50.92" # IP address of your Raspberry PI
PORT = 65432          # Port to listen on (non-privileged ports are > 1023)

power_val = 50
curr_direction = ""

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()

    try:
        while 1:
            client, clientInfo = s.accept()
            print("server recv from: ", clientInfo)
            data = client.recv(1024)      # receive 1024 Bytes of message in binary format
            if data != b"":
                if data == b"87\r\n":
                    print("Moving forward")
                    fc.forward(power_val)
                    curr_direction = "forward"
                    client.send((str(power_val) + "," + curr_direction).encode())

                elif data == b"83\r\n":
                    print("Moving backward")
                    fc.backward(power_val)
                    curr_direction = "backward"
                    client.send((str(power_val) + "," + curr_direction).encode())
                    
                elif data == b"65\r\n":
                    print("Moving left")
                    fc.turn_left(power_val)
                    curr_direction = "left"
                    client.send((str(0) + "," + curr_direction).encode())
                    
                elif data == b"68\r\n":
                    print("Moving right")
                    fc.turn_right(power_val)
                    curr_direction = "right"
                    client.send((str(0) + "," + curr_direction).encode())
                    
                elif data == b"82\r\n":
                    print("Faster speed")
                    if power_val <=90:
                        power_val += 10
                        print("power_val:",power_val)
                        if curr_direction == "forward":
                            fc.forward(power_val)
                        elif curr_direction == "backward":
                            fc.backward(power_val)
                        client.send((str(power_val) + "," + curr_direction).encode())

                elif data == b"70\r\n":
                    print("Slower speed")
                    if power_val >=10:
                        power_val -= 10
                        print("power_val:",power_val)
                        if curr_direction == "forward":
                            fc.forward(power_val)
                        elif curr_direction == "backward":
                            fc.backward(power_val)
                        client.send((str(power_val) + "," + curr_direction).encode())

                elif data == b"32\r\n":
                    print("Stop")
                    curr_direction = "stop"
                    fc.stop()
                    client.send((str(0) + "," + curr_direction).encode())

                else:
                    print(str(data))     

                # client.sendall(data) # Echo back to client
    except: 
        fc.stop()
        print("Closing socket")
        client.close()
        s.close() 
