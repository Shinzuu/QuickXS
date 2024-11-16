<script>
    import routineData from "./data/routineData.json"; // Ensure the path is correct
    import eventsData from './data/eventsData.json'; // Import the events data
    
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    const subjectFullNames = {
      MAD: "Mobile Application Development",
      ISD: "Information System Design",
      AI: "Artificial Intelligence",
      AIL: "Artificial Intelligence Laboratory",
      OS: "Operating Systems",
      OSL: "Operating Systems Laboratory",
      COA: "Computer Organization & Architecture",
      STP: "Statistics and Probability",
    };
    
    const teacherFullNames = {
      TDM: "Ms. Tanni Dhoom",
      DD: "Dhrubajyoti Das",
      AD: "Avisheak Das",
      SRM: "Shatabdi Roy Moon",
      GH: "Unknown Teacher (GH)",
      AM: "Unknown Teacher (AM)",
    };
    
    const subjectIcons = {
      MAD: "fas fa-mobile-alt",
      ISD: "fas fa-network-wired",
      AI: "fas fa-robot",
      AIL: "fas fa-laptop-code",
      OS: "fas fa-microchip",
      OSL: "fas fa-server",
      COA: "fas fa-cogs",
      STP: "fas fa-chart-line",
    };
    
    const currentTime = new Date();  // Get the current date and time
    const currentDay = daysOfWeek[currentTime.getDay() - 1];  // Get current day
    const isAfter5PM = currentTime.getHours() >= 17;  // Check if it's after 5 PM
    
    // Get the next day after the current day
    function getNextDay(currentDay) {
      const currentIndex = daysOfWeek.indexOf(currentDay);
      const nextIndex = (currentIndex + 1) % daysOfWeek.length; // Circular array for next day
      return daysOfWeek[nextIndex];
    }
    
    // Function to find all classes for a given day
    function findClassesForDay(day) {
      const dayData = routineData.schedule.find((d) => d.day === day);
      return dayData?.classes || []; // Return all classes for the given day (if exists)
    }
    
    // If it's after 5 PM, display the next day's classes; otherwise, display today's classes
    const dayToDisplay = isAfter5PM ? getNextDay(currentDay) : currentDay;
    const classesForDay = findClassesForDay(dayToDisplay);
    
    // Parsing event data and filtering the upcoming events
    function parseEventDate(event) {
      const date = new Date(event.date + ' ' + event.time.split(' - ')[0]); // Taking start time for sorting
      return date;
    }
    
    function getCurrentDateTime() {
      return new Date();
    }
    
    function getUpcomingEvents() {
      const currentTime = getCurrentDateTime();
    
      const sortedEvents = eventsData
        .map(event => {
          const eventDate = parseEventDate(event);
          return { ...event, eventDate };
        })
        .filter(event => event.eventDate > currentTime) // Only future events
        // @ts-ignore
        .sort((a, b) => a.eventDate - b.eventDate); // Sort by date
    
      return sortedEvents.slice(0, 3); // Get the next 3 upcoming events
    }
    
    const upcomingEvents = getUpcomingEvents();
  </script>
  
  <h1 class="text-2xl font-bold mb-4 text-tea_green-300">Upcoming Sections</h1>
  
  <div class="flex flex-col sm:flex-row sm:space-x-4">
    <!-- Upcoming Classes Section -->
    <div class="bg-white shadow-lg p-4 rounded-lg border border-tea_green-300 w-full sm:w-1/2 mb-4 sm:mb-0">
      <h2 class="text-xl font-bold mb-4">Classes for {dayToDisplay}</h2>
      {#if classesForDay.length > 0}
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto">
            <thead>
              <tr>
                <th class="px-4 py-2 text-left">Time</th>
                <th class="px-4 py-2 text-left">Subject</th>
                <th class="px-4 py-2 text-left">Teacher</th>
                <th class="px-4 py-2 text-left">Classroom</th>
                <th class="px-4 py-2 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              {#each classesForDay as { time, subject, teacher, classroom, duration }}
                <tr class="border-b border-gray-200">
                  <td class="px-4 py-2">{time}</td>
                  <td class="px-4 py-2 flex items-center break-words">
                    <i class={`${subjectIcons[subject]} text-tea_green-500 text-xl mr-2`} ></i>
                    {subjectFullNames[subject]}
                  </td>
                  <td class="px-4 py-2 break-words">{teacherFullNames[teacher]}</td>
                  <td class="px-4 py-2 break-words">{classroom}</td>
                  <td class="px-4 py-2">{duration} min</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {:else}
        <p class="text-gray-500">No classes scheduled for {dayToDisplay}.</p>
      {/if}
    </div>
  
    <!-- Upcoming Events Section -->
    <div class="bg-white shadow-lg p-4 rounded-lg border border-tea_green-300 w-full sm:w-1/2">
      <h2 class="text-xl font-bold mb-4">Upcoming Events</h2>
      {#if upcomingEvents.length > 0}
        <ul>
          {#each upcomingEvents as event}
            <li class="mb-4">
              <strong>{event.name}</strong><br>
              <em>{event.date} {event.time}</em><br>
              <p>{event.info}</p>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-gray-500">No upcoming events.</p>
      {/if}
    </div>
  </div>
  
  <style>
    .text-tea_green-500 {
      color: #3a9d88; /* Replace with your tea green color */
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }
    
    th {
      background-color: #f0f8ff;
      font-weight: bold;
    }
    
    .table-auto td, .table-auto th {
      padding: 10px 12px;
    }
    
    i {
      margin-right: 8px;
    }
    
    @media (max-width: 640px) {
      .table-auto td, .table-auto th {
        padding: 8px;
      }
    }
  </style>
  