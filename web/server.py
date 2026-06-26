#!/usr/bin/env python3
"""Simple HTTP Server with UTF-8 encoding"""
from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys

class UTF8HTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        super().end_headers()

if __name__ == '__main__':
    port = 8000
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    
    server_address = ('', port)
    httpd = HTTPServer(server_address, UTF8HTTPRequestHandler)
    print(f'Server running at http://localhost:{port}')
    print('Press Ctrl+C to stop')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\nServer stopped')
        httpd.server_close()