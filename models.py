#!/usr/bin/env python

from google.appengine.ext import ndb
from datetime import datetime, date, timedelta
import logging
import utils


class Specie(ndb.Model):
    name = ndb.StringProperty(required=True)
    population = ndb.IntegerProperty(default=0)
    """
    List with dict objects with the following format:
    {
        'x': int,
        'y': int,
        'a': int # Amount
    }
    """
    locations = ndb.JsonProperty()

    def set_locations(self, locations):
        for location in locations:
            if not utils.has_dict_values(location, ["x", "y", "a"]):
                raise ValueError("Missing required value in dict: " + location)
            self.population += location['a']
        self.locations = locations

    def get_data(self):
        return {
            'id': self.key.id(),
            'name': self.name,
            'population': self.population,
            'locations': self.locations if self.locations else []
        }