// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(function () {

  //Defining today's date in a variable
  var today = dayjs();
  

  //Displays today's date
  var todaysDate = today.format('[Today is] dddd, MMMM D YYYY');
  $('#currentDay').text(todaysDate);


  $(".saveBtn").on("click", function() {
    //finds the closest element with the .time-block class to whichever save button the user pressed
    var timeBlock = $(this).closest(".time-block"); 

    //stores said time block into variable
    var timeBlockId = timeBlock.attr("id");

    //defines the .description class within the time block container as the user input
    var userInput = timeBlock.find(".description").val();

    //stores the user input into local storage
    localStorage.setItem(timeBlockId, userInput);
  });
    
  //Variable includes all .timeb-block classes
  var timeBlocks = $(".time-block");

  //For loop to assign classes to past, present and future time blocks
  for (var i = 0 ; i < timeBlocks.length ; i++) {

    //stores current hour into variable
    var currentHour = today.hour();

    //stores current time block into variable, depending on position in for loop
    var timeBlock = $(timeBlocks[i]);

    //splits the id name of current time block to get a number so we can compare to the current hour
    var timeBlockHour = parseInt(timeBlock.attr("id").split("-")[1]);

    //Conditional statements compare current hour to time blocks
    if (timeBlockHour > currentHour) {
      timeBlock.addClass("future");
    } else if (timeBlockHour === currentHour) {
      timeBlock.addClass("present");
    } else {
      timeBlock.addClass("past");
    }

    //redefining the timeBlockId since it is out of scope from the save button click event
    var timeBlockId = timeBlock.attr("id");
    //
    var savedContent = localStorage.getItem(timeBlockId);
    timeBlock.find(".description").val(savedContent);
  }
});
