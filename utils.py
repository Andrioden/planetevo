#!/usr/bin/env python

import json
# from google.appengine.api import users
from datetime import datetime


def set_json_response(response, data):
    response.headers['Content-Type'] = 'application/json'
    response.out.write(json.dumps(data))


# def validate_request_data(response, request_data, required_keys):
#     if not has_dict_values(request_data, required_keys):
#         error_400(response, "VALIDATION_ERROR_MISSING_DATA", "The request data is missing the input value '%s'" % key)
#         return False
#     return True


def has_dict_values(dictionary, required_keys):
    for key in required_keys:
        if dictionary.get(key, None) in [None, '']:
            return False
    return True