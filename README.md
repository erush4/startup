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

# HTML deliverable
The main structure of the website is now in place.
- **HTMl files** - There are 6 HTML pages. Not every page is entirely complete (password reset and account creation) since we haven't covered databases, but those are fairly self-explanatory and everything required is covered.
- **HTML tags** - Each page has a header containing a nav tag, as well as a footer. The head is also fully implemented. Body and main are also present. Other tags are also present. I have a second branch that stores a good chunk of the inputs in forms, but I haven't merged that yet since there wasn't any visual difference for the website. Let me know if I need to fix that.
- **Links** - The nav bar/header at the top of each page lets you travel to the main 4 pages. At some point, I want to trim some of them off and change them a bit depending on whether or not the user is signed in, but for ease of grading they are all there. The two incomplete pages are linked to from the login page.
- **Text** - Lots of the text I want to display will end up being in pop-up windows, sidebars, and whatever api I use for the map. However, there is enough text right now that you can see what the eventual vision is.
- **Images** - There is a sample profile photo in the profile page; the logo I made is visible on the about page, and there are cats on the password reset/account creation pages. Plus the favicon.
- **Login placeholder** - Yup, it's there, along with placeholder pages for password reset and account creation.
- **Database** - The database will store the login info and settings for each user, as well as a few weeks of survey data that will be displayed on the map.
- **WebSocket data** - The map should be updated in real time so long as I can get an api that allows that kind of thing. If you know of any good ones let me know.

# CSS Deliverable
- **Header, footer, and main content body** - present, footer does not overlap content but will stick to the bottom of the page.
- **Navigation elements** - created navbar, aligned items and brand name to opposite sides, including logo.
- **Responsive to window resizing** - app is designed to be used on smartphones, but the map and other elements should scale to fit larger screens as well. Navbar will change on smaller screens.
- **Application elements** - reasonable contrast and whitespace, important elements are in a different color, does not hurt to look at
- **Application text content** - consistent fonts, resized and indented appropriately.
- **Application images** - appropriately resized and aligned.

# React Deliverable
- **Bundled using Vite** - yup
- **Components** - complete and mocked up (minus some API requirements)
- **Login** - Can login or create account
  - **Settings** - can choose to submit surveys anonymously
  - **Map and survey data** - There is no longer a map displaying, since that was just an html import. I have opted to display the data just as JSON strings in a box, since I will need the Google Maps API to properly render it all. That is coming in the Service deliverable. Surveys also use (0,0) for coordinates in absense of the map location being available.
  - **WebSocket** - setInterval function periodically adds an example survey to the list.
  - **Database** - mocked up using local storage
- **Router** - Routing between all neccessary pages (map, help, profile)
- **Hooks** - SOOO many hooks. I feel like I did nothing but hooks. useState, and useEffect ensure the map and the profile can pass necessary information while also keeping all data up-to-date.

# Service Deliverable
- **Create An HTTP service** - yessir
- **Static middleware for frontend** - indubitably
- **Third party services** - Google Maps/geolocation
- **Backend service endpoints** - store users/user settings on server. data/heatmap endpoints.
- **Frontend calls service endpoints** - via fetch

# Login Deliverable
- **MongoDB Atlas database** - whole and in peak form
- **Stores data in MongodB** - without a doubt
- **User registration** account creation page is entirely functional, complete with default settings being created
- **existing user login** - sucessfully logs in and recovers saved settings
- **Stores and retrieves credentials** - spent a lot of time playing with this for the settings. yes it does this successfully
- **Restricts functionality based on authentication** - Frontend should automatically redirect away from pages that require a login. Backend should reject queries from these pages without the authentication cookie.

# WebSocket Deliverable
- **Backend listens for WebSocket connection** - veritably so
- **Frontend makes WebSocket connection** - unquestionably so
- **Data sent over WebSocket connection** - undeniably so
- **Websocket data displayed** - speedily and with great precision
- **All visible elements are working** - yes... although I have way more I'd like to implement (like other lots besides Y lots). But, for the purposes of this class, every element that needs displaying is displayed perfectly. 

# More features coming soon!