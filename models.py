#!/usr/bin/env python

from google.appengine.ext import ndb
from datetime import datetime, date, timedelta
import logging

class Specie(ndb.Model):
    name = ndb.StringProperty(required=True)
    x = ndb.IntegerProperty(required=True)
    y = ndb.IntegerProperty(required=True)

    def get_data(self):
        return {
            'id': self.key.id(),
            'name': self.name
        }