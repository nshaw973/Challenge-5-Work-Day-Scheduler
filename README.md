# Challenge-5-Workday-Scheduler
Calendar application for uci bootcamp

## Deployed Site

https://nshaw973.github.io/Challenge-5-Work-Day-Scheduler/

## The Task

With the site essentially being built with the basic code. My task was to get the site to look like a proper scheduler, with Color Coded hourly time blocks, that could have tasks typed into those blocks and saved onto the local storage

![Scheduler Main Page](./assets/images/site.PNG)

## The Coding Process

The First step taken was just getting the current date to display onto the Header.

the currentHour Var, is being used to create a 24hour based clock in the background that will be used later in the code for color coding the time blocks based on wether the time block is in the past, present, or future

The currentTime Var is just pulling the current Day, Month, date, and Year. From the dayjs api.

![Time Added to Header](./assets/images/time-header.PNG)

The second step I took into creating the site was getting the time blocks generated, via Javascript, as opposed to creating a block for everysingle time block in the HTML, essentially bloating the html with a bunch of code, and instead having the Javascript do a simple For loop to generate it all.

The first block of Variables is just creating the HMTL elements with JQuery, and also adding the classes that were created from Bootstrap. 

Then the Elements are appropiately appended to each other, using the Div container with the #mainDiv id I added, to be able to create a new block per loop to that Div.


![Time Block Code](./assets/images/time-block-code.PNG)

Next thing was to get the time blocks to react to the current time of the day, so that the time blocks could be color coded appropiately to past, present, or future.

Since the first block started with 9am, I added the hourOfDay Variable to the first timeblock loop to be 9, to correspond to the 24hour loop. So if the hourOfDay ends up being <, >, or = to the currentHour Var, then the function will add the appropiate CSS styling.

![Color Coding the Blocks](./assets/images/time-colors.PNG)

Last thing that needed to be done was getting whatever was typed into the time block to be saved onto the local storage.

Each buttonEl was given an index via the save-button-index attribute. that will have an index number that will be used to connect the text stored into the appropiate timeblock on a reload.

The FullScheduleText Variable is going to create an empty string for every single timeblock, so that even if the string is empty, then that empty string will have its own index. That way when something overwrites that empty string, its going to have an index regardless.

the storeText(index, text) function is just taking the index value that was pulled from the save-button-index, and the textArea.val() into the text parameter, so that the fullScheduleText, gets that index number overwriten, and overwrites that specific index with that text, so that none of the other text indexes are touched while being saved to the local storage.

Lastly the fullScheduleText var, is being turned into a JSON. which will then be parsed, in the init function.

![Stored Data](./assets/images/save-button.PNG)

## Acceptance Criteria

```md
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```