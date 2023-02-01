//Global Variables------------------------------------------------------------------------------------//

var allTimes = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'];
var mainDiv = $('#mainDiv');
var hourOfDay = 9;

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
    //Filling the TextArea with saved text from teh local storage
      textAreaEl.text(fullScheduleText[i])
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

    //Turns the save button into a clickable event
    buttonEl.on('click', function (event){
      event.preventDefault();
      event.stopPropagation();

      //Selects the button via event.target, then turns it into the var target, where we then grab its attribute and its value from the save-button-index
      var target = $(event.target)
      var index = target.attr('save-button-index')
      if(index === undefined){
        return;
      }
      console.log(index)
      var textArea = $('#text-area-' + index)
  
      storeText(index, textArea.val());
      console.log("text", textArea.val())
    });

    console.log(hourOfDay)
    hourOfDay++;

  }
}

//----------------------------------------------------------------------------------------------------//
//This Stores everything into a local storage---------------------------------------------------------//

var saveBtn = $('saveBtn');

//new Array is creating an array with an empty list for every single timeblock text area.
//to prevent a crash when saving when an index doesn't exist
var fullScheduleText = new Array(allTimes.length).fill("");

function storeText(index, text) {

  console.log(fullScheduleText)
  fullScheduleText[index] = text
  console.log(fullScheduleText)

  localStorage.setItem("fullSchedule", JSON.stringify(fullScheduleText))
}

function init() {
  var storedSchedule = localStorage.getItem("fullSchedule")
  if (!storedSchedule){
    return;
  }

  fullScheduleText = JSON.parse(storedSchedule)
}

//----------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------//

init();
timeBlocks();