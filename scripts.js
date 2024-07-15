document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch events from JSON file
    async function fetchEvents() {
        try {
            const response = await fetch('seed_data.json');
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const eventsData = await response.json();
            return eventsData;
        } catch (error) {
            console.error('Error fetching events:', error.message);
            return []; // Return empty array on error
        }
    }

    // Function to convert time string (e.g., "08:30" or "13:00") to 24-hour format
    function convertTo24Hour(time) {
        const [hourStr, minuteStr] = time.split(':');
        let hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);

        // Return hour and minute as is for 24-hour format
        return { hour24: hour, minute };
    }

    // Function to calculate remaining time and sort events
    function calculateAndSortEvents(events) {
        // Get current date and time
        const now = new Date();

        // Calculate remaining time and filter out past events
        const upcomingEvents = events.filter(event => {
            const { hour24, minute } = convertTo24Hour(event.time);
            const deadlineDateTime = new Date(event.date);
            deadlineDateTime.setHours(hour24, minute, 0, 0);

            if (deadlineDateTime < now) {
                return false; // Skip past events
            }

            // Calculate remaining time in milliseconds
            const diffTime = deadlineDateTime - now;

            // Convert remaining time to days, hours, and minutes
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

            // Add remaining time details to event object
            event.remainingDays = diffDays;
            event.remainingHours = diffHours;
            event.remainingMinutes = diffMinutes;

            return true;
        });

        // Sort events by remaining time (ascending)
        upcomingEvents.sort((a, b) => {
            if (a.remainingDays !== b.remainingDays) {
                return a.remainingDays - b.remainingDays;
            }
            if (a.remainingHours !== b.remainingHours) {
                return a.remainingHours - b.remainingHours;
            }
            return a.remainingMinutes - b.remainingMinutes;
        });

        return upcomingEvents;
    }

    // Function to display events in the upcoming events section as a table
    function displayEvents(events) {
        const upcomingEventsTable = document.getElementById('upcoming-events-table');
        if (!upcomingEventsTable) return;

        // Clear existing content
        upcomingEventsTable.innerHTML = '';

        // Populate the table with event rows
        events.forEach((event, index) => {
            const row = document.createElement('tr');

            // Index column
            const indexCell = document.createElement('td');
            indexCell.textContent = index + 1;
            row.appendChild(indexCell);

            // Title column
            const titleCell = document.createElement('td');
            titleCell.textContent = event.title;
            row.appendChild(titleCell);

            // Date column
            const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const dateCell = document.createElement('td');
            dateCell.textContent = formattedDate;
            row.appendChild(dateCell);

            // Time column
            const timeCell = document.createElement('td');
            timeCell.textContent = event.time;
            row.appendChild(timeCell);

            // Remaining time column
            const remainingTimeCell = document.createElement('td');
            const remainingDays = event.remainingDays;
            const remainingHours = event.remainingHours;
            const remainingMinutes = event.remainingMinutes;
            const remainingTimeText = `${remainingDays}d ${remainingHours}h ${remainingMinutes}m`;
            remainingTimeCell.textContent = remainingTimeText;
            remainingTimeCell.classList.add('remaining-time');
            row.appendChild(remainingTimeCell);

            // Append row to the table
            upcomingEventsTable.appendChild(row);
        });
    }

    // Fetch events, calculate remaining time, sort, and display
    fetchEvents()
        .then(events => {
            const upcomingEvents = calculateAndSortEvents(events);
            displayEvents(upcomingEvents);
        })
        .catch(error => {
            console.error('Error fetching or displaying events:', error);
        });
});
