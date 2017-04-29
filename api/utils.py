#!/usr/bin/env python

import json
from google.appengine.api import users
from datetime import datetime


def set_json_response(response, data):
    response.headers['Content-Type'] = 'application/json'
    response.out.write(json.dumps(data))