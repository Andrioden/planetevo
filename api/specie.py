#!/usr/bin/env python

import json
import random
import webapp2
import utils
from config import *
from models import *


class SpeciesHandler(webapp2.RequestHandler):
    def get(self):
        species_data = [specie.get_data() for specie in Specie.query()]
        utils.set_json_response(self.response, species_data)

    def post(self):
        """ --------- CREATE GAME --------- """
        request_data = json.loads(self.request.body)
        logging.info("Request:")
        logging.info(request_data)

        specie = Specie(
            name=request_data['name'],
        )
        specie.set_locations([{
            'x': random.randint(0, WorldConfig.Width - 1),
            'y': random.randint(0, WorldConfig.Height - 1),
            'a': SpecieConfig.StartPopulation
        }])

        specie = specie.put().get()

        utils.set_json_response(self.response, specie.get_data())


app = webapp2.WSGIApplication([
    (r'/api/specie/', SpeciesHandler),
], debug=True)