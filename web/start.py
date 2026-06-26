#!/usr/bin/env python3
"""Simple UTF-8 HTTP Server"""
from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys
import os

# Change to web directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class MyHTTPRequestHandler(SimpleHTTPRequestHandler):
    def guess_type(self, path):
        mimetype, encoding = super().guess_type(path)
        if mimetype == 'text/html':
            return 'text/html; charset=utf-8', encoding
        return mimetype, encoding

if __name__ == '__main__':
    port = 8000
    server_address = ('', port)
    httpd = HTTPServer(server_address, MyHTTPRequestHandler)
    print(f'Server running at http://localhost:{port}')
    print('Press Ctrl+C to stop')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\nServer stopped')
        httpd.server_close()