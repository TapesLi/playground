import os
import sys
import socket
import multiprocessing

response = 'HTTP/1.1 200 OK\r\nConnection: Close\r\nContent-Length: 1\r\n\r\nA'
requestCount = 0

server = socket.socket()
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server.bind(('0.0.0.0', 8080))
server.listen(32)

def handler(client):
    request = client.recv(4096)
    print request
    client.send(response)
    client.close()
    sys.exit()

while True:
    client, addr = server.accept()
    process = multiprocessing.Process(target=handler, args=(client,))
    process.daemon = True
    process.start()
    print requestCount
    print addr
    print ''
    requestCount += 1
