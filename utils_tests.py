#!/usr/bin/env python

# Inspired by https://cloud.google.com/appengine/docs/python/tools/localunittesting

# Correct path so ndb can be imported (in models.py)
# import sys
# sys.path.insert(0, "C:\Program Files (x86)\Google\google_appengine")
# import dev_appserver
# dev_appserver.fix_sys_path()

import unittest
import utils


class TestUtilsFunctions(unittest.TestCase):

    def setUp(self):
        pass

    def test_has_dict_values(self):
        self.assertFalse(utils.has_dict_values({'x': 1, 'y': 0, 'a': None}, ["x", "y", "a"]))
        self.assertFalse(utils.has_dict_values({'x': 1, 'y': 0}, ["x", "y", "a"]))
        self.assertFalse(utils.has_dict_values({'x': 1}, ["x", "y", "a"]))
        self.assertFalse(utils.has_dict_values({}, ["x", "y", "a"]))

        self.assertTrue(utils.has_dict_values({'x': 1, 'y': 1, 'a': 1}, ["x", "y", "a"]))


if __name__ == '__main__':
    unittest.main()