function highlightClasses() {
    const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const today = new Date();
    let currentDay = today.getDay();
    let currentHour = today.getHours();
    let currentMinute = today.getMinutes();
    
    if (currentDay === 4 || currentDay === 5 || (currentDay === 6 && (currentHour > 14 || (currentHour === 14 && currentMinute > 30)))) {
        currentDay = 6; // Highlight Saturday if it's Thursday, Friday, or Saturday after 2:30 PM
    } else {
        if (currentHour > 14 || (currentHour === 14 && currentMinute > 30)) {
            currentDay = (currentDay + 1) % 7; // Move to the next day after 2:30 PM
        }
    }

    const classDay = days[currentDay];
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach(row => {
        if (row.classList.contains(classDay)) {
            row.classList.add("highlight");
        } else {
            row.classList.remove("highlight");
        }
    });
}

highlightClasses();
setInterval(highlightClasses, 60000); // Check every minute
