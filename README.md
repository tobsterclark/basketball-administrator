# RunSheetControl

Google Cloud project with the following services:
1. functions
	This is what is used to generate weekly runsheets
2. cloud sql
	Hosting player, team, and game data
3. cloud run
	Wix adapter to connect cloud sql to the Wix Data API

Also includes an electron project which can be used for downloading weekly scoresheets, possibly team management as well

Database notes:
- Wix CMS is a cool tool, however clunky to manage and contains some annoyances which will make maintainability more difficult
- Cloud SQL
	- Setting up the data to be hosted in cloud sql means that if we pivot from wix we can connect to whatever service we choose to utilise without much fuss
	- it also means that the player, team, and game management can be done from the electron app, ensuring a customisable and seamless experience
	- unfortunantely, has an estimated cost of $9 per month

Todo:
1. Object Resource Manager setup to enable easy type safe communication to the database (seperate project so electron and functions can utilise it)
2. Cloud function, with the ORM create a runnable function to demonstrate
3. Setup electron application to initially demo downloading weekly scoresheet from there
