#!/usr/bin/env python

import webapp2
import json
import logging
import time
import random
from models import *
from api.utils import *
import config


class SpeciesHandler(webapp2.RequestHandler):
    def get(self):
        species_data = [specie.get_data() for specie in Specie.query()]
        set_json_response(self.response, species_data)

    def post(self):
        """ --------- CREATE GAME --------- """
        request_data = json.loads(self.request.body)
        logging.info("Request:")
        logging.info(request_data)

        specie = Specie(
            name = request_data['name'],
            x = random.randint(0, config.World.Width - 1),
            y = random.randint(0, config.World.Height - 1),
        ).put().get()

        set_json_response(self.response, {'specie': specie.get_data()})


app = webapp2.WSGIApplication([
    (r'/api/specie/', SpeciesHandler),
], debug=True)