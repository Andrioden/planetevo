import datetime

from google.appengine.ext import ndb

import webapp2
from models import *
import simulator


class TickHandler(webapp2.RequestHandler):
    def get(self):
        logging.info("Cron Tick")
        simulator.simulate_tick()


app = webapp2.WSGIApplication([
    (r'/cron/tick', TickHandler),
], debug=True)
