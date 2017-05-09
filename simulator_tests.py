#!/usr/bin/env python

# Inspired by https://cloud.google.com/appengine/docs/python/tools/localunittesting
# Correct path so ndb can be imported (in models.py)
import sys
sys.path.insert(0, "C:\Program Files (x86)\Google\google_appengine")
import dev_appserver
dev_appserver.fix_sys_path()

import unittest
from google.appengine.api import users
from google.appengine.ext import testbed
from google.appengine.api import memcache
from google.appengine.ext import ndb
from models import *
import simulator


class SimulatorTestCase(unittest.TestCase):
    def setUp(self):
        # GAE test setup
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        ndb.get_context().clear_cache()
        # Business Logic setup
        specie = Specie(
            name="Test Specie",
        )
        specie.set_locations([{
            'x': 0,
            'y': 0,
            'a': 100
        }])
        specie.put()

    def tearDown(self):
        self.testbed.deactivate()

    def test_populate(self):
        self.assertEqual(1, Specie.query().count(1))
        simulator.simulate_tick()
        specie_after_sim = Specie.query().get()
        self.assertEqual(101, specie_after_sim.population)


if __name__ == '__main__':
    unittest.main()