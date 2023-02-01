// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.


//Global Variables------------------------------------------------------------------------------------//

var allTimes = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'];
var mainDiv = $('#mainDiv');
var hourOfDay = 9;

//----------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------//
//Time based Code, and Shows current date on header---------------------------------------------------//

//24hour based code to be used in the background for color coding the timeblocks
var currentHour = dayjs().hour()
console.log('This is the Current Hour based on 24hours = ' + currentHour);

//Code added to display the current day in the Header
var currentTime = dayjs();
$('#currentDay').text(currentTime.format('dddd, MMM, D YYYY'));
console.log(currentTime);

//----------------------------------------------------------------------------------------------------//
//This creates the textboxes with the corresponding times.--------------------------------------------//

function timeBlocks() {
  for (var i = 0; i < allTimes.length; i++) {

    //elements for each timeblock that will load up with different hours

    var divEl = $('<div>');
    var timeDiv = $('<div class="col-2 col-md-1 hour text-center py-3"></div>');
    var textAreaEl = $('<textarea class="col-8 col-md-10 description" rows="3"></textarea>');
    var buttonEl = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save">');
    var iEl = $('<i class="fas fa-save" aria-hidden="true"></i>');

    //connects each element inside a div to create the timeBlock
    mainDiv.append(divEl);
    divEl.append(timeDiv);
    divEl.append(textAreaEl);
    divEl.append(buttonEl);
    buttonEl.append(iEl);
    //Adds a time from the Alltimes Var per block depending what index the for loop is on.
    timeDiv.text(allTimes[i]);

    //Giving each time block a specific hour to correspond to the time its labeled as
    divEl.attr('hour-of-day', hourOfDay);

    //creating an ID for every text area to grab its values when saving to local storage
    textAreaEl.attr('id', 'text-area-' + i)

    //both of these will get the current index of a row when saving to local storage
    buttonEl.attr('save-button-index', [i])
    iEl.attr('save-button-index', [i])


    //this will change the color of the block depending on the time of day
    if (hourOfDay < currentHour) {
      divEl.attr('class', `row time-block past`);
    }

    if (hourOfDay === currentHour) {
      divEl.attr('class', `row time-block present`);
    }

    if (hourOfDay > currentHour) {
      divEl.attr('class', `row time-block future`);
    }



    console.log(hourOfDay)
    hourOfDay++;

  }
}

timeBlocks();