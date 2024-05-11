// Function to update the time left for each exam
function updateExamsTime() {
    var exams = [
        { name: "MM CT1", time: new Date("2024-05-12T13:00:00") }, // Example exam data
        { name: "MID ", time: new Date("2024-06-08T10:30:00") },
        { name: "DSML Lab perf", time: new Date("2024-05-13T08:30:00") },
    ];

    // Sort exams based on start time
    exams.sort(function(a, b) {
        return a.time - b.time;
    });

    var examsList = document.getElementById("incomingExams");
    examsList.innerHTML = "";

    exams.forEach(function(exam) {
        var currentTime = new Date();
        var timeDiff = exam.time - currentTime;
        var daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        var hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        // Format the date, month, and year
        var date = exam.time.getDate();
        var month = exam.time.getMonth() + 1; // Month is zero-indexed
        var year = exam.time.getFullYear();

        var listItem = document.createElement("li");

        // Construct the remaining time message
        var remainingTimeMessage = " - ";

        if (daysLeft > 0) {
            remainingTimeMessage += daysLeft + " days ";
        }

        remainingTimeMessage += hoursLeft + "h " + minutesLeft + "m left";

        // Concatenate exam details and remaining time
        listItem.textContent = exam.name + " - " + date + "/" + month + "/" + year + remainingTimeMessage;
        
        examsList.appendChild(listItem);
    });
}

// Call updateExamsTime function initially
updateExamsTime();

// Update time every minute
setInterval(updateExamsTime, 60000);
