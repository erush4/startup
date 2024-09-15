# ParkIt

Every BYU student that drives to campus knows the agony of trying to find parking. There are so few spots that it seems like all the lots are full by 9:00 AM. It's hard to find which lots might still have an open space or two, especially when you're in a hurry. To add insult to injury, the BYU parking app doesn't even list all the lots. Because of this, many students mistakenly (or on purpose) park illegaly, risking parking tickets.

In order to combat this, I am creating a crowd-sourced app that will collect data from users on the parking conditions. Users will be able to report the conditions of the parking lot they are in (how many spots are nearby, if the lot is full, etc.) This data will then be visible to others, helping them to decide which lots to try their luck in.

## Key Features

- Login page
- Map showing all BYU parking lots, sortable by type (A lot, G lot, Y lot, U lot...)
- Survey that collects data for a certain lot (or region of lot, in the case of large lots)
- Data on lots will be aggregated and displayed on the map
- Settings: allow users to determine which lots they want to view, how far in the past they want to view others' surveys, etc.
- Embedded Google maps?

## Technology Usage

- **HTML** - skeleton of the login page, map page, and settings page
- **CSS** - Aesthetics of each page, as well as formatting for different screen sizes/devices
- **JavaScript/React** - Interactivity of the Survey, Login, Settings, and possibly the map
- **Web Service** - Communicating with Backend for:
    - Submitting survey data
    - retrieving lot data

  Possible communication with map service, depending on implementation

- **Login** - users must be registered to contribute, save settings, view historical data, etc.
- **Database** - stores lot data, user registration, user settings
- **WebSocket** - maintaining up-to-date survey data on lots

## Rough Sketch

![VERY rough sketch, seriously](VERY%20Rough%20Sketch.jpg)