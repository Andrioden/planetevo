#!/usr/bin/env python

from models import *
import random


def simulate_tick():
    for specie in Specie.query():
        _populate(specie)
        specie.put()


def _populate(specie):
    expand_count = 0
    for location in specie.locations:
        if location['a'] >= 100:
            expand_count += 1
        else:
            location['a'] += 1

    if expand_count > 0:
        specie.locations = _expand_from_locations(specie.locations, expand_count)

    specie.set_locations(specie.locations)


def _expand_from_locations(locations, expand_count):
    spawn_from_location = random.choice(locations)
    spawn_cord = _random_nearby_coordinate(spawn_from_location)

    nearby_location = [loc for loc in locations if loc['x'] == spawn_cord['x'] and loc['y'] == spawn_cord['y']]
    if len(nearby_location) == 0:
        spawn_cord['a'] = expand_count
        locations.append(spawn_cord)
    else:
        nearby_location[0]['a'] += expand_count

    return locations


def _random_nearby_coordinate(location):
    return {
        'x': location['x']+random.randint(-1, 1),
        'y': location['y']+random.randint(-1, 1)
    }