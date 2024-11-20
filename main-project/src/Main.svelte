<script>
  import routineData from "./data/routineData.json";
  import eventsData from "./data/eventsData.json";

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const subjectFullNames = {
    MAD: "Mobile Application Development",
    ISD: "Information System Design",
    AI: "Artificial Intelligence",
    AIL: "Artificial Intelligence Laboratory",
    OS: "Operating Systems",
    OSL: "Operating Systems Laboratory",
    COA: "Computer Organization & Architecture",
    SAP: "Statistics and Probability",
  };

  const teacherFullNames = {
    TDM: "Ms. Tanni Dhoom",
    DD: "Dhrubajyoti Das",
    AD: "Avisheak Das",
    SRM: "Shatabdi Roy Moon",
    GH: "Dr. MD. GH",
    AM: "Asif Mohammad",
  };

  const subjectIcons = {
    MAD: "fas fa-mobile-alt",
    ISD: "fas fa-network-wired",
    AI: "fas fa-robot",
    AIL: "fas fa-laptop-code",
    OS: "fas fa-microchip",
    OSL: "fas fa-server",
    COA: "fas fa-cogs",
    SAP: "fas fa-chart-line",
  };

  const currentTime = new Date();
  const currentDay =
    daysOfWeek[(currentTime.getDay() - 1 + daysOfWeek.length) % daysOfWeek.length];

  function parseTimeTo24Hour(timeStr) {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    }
    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return { hours, minutes };
  }

  function getNextScheduledDay(currentDay) {
    // Get a list of days with classes
    const scheduledDays = routineData.schedule.map((d) => d.day);

    // Find the next scheduled day in a cyclic manner
    const currentIndex = daysOfWeek.indexOf(currentDay);
    for (let i = 1; i <= daysOfWeek.length; i++) {
      const nextIndex = (currentIndex + i) % daysOfWeek.length;
      const nextDay = daysOfWeek[nextIndex];
      if (scheduledDays.includes(nextDay)) {
        return nextDay;
      }
    }

    // Fallback (shouldn't occur if data is valid)
    return currentDay;
  }

  function getDayToDisplay() {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const endOfDay = { hours: 17, minutes: 0 };

    if (
      currentHour > endOfDay.hours ||
      (currentHour === endOfDay.hours && currentMinute >= endOfDay.minutes)
    ) {
      return getNextScheduledDay(currentDay);
    }

    return currentDay;
  }

  function findClassesForDay(day) {
    const dayData = routineData.schedule.find((d) => d.day === day);

    if (!dayData) return [];

    return dayData.classes.map((classItem) => {
      const { time } = classItem;
      const { hours, minutes } = parseTimeTo24Hour(time);
      return { ...classItem, hours, minutes };
    });
  }

  function parseEventDate(event) {
    const date = new Date(event.date + " " + event.time.split(" - ")[0]);
    return date;
  }

  function getCurrentDateTime() {
    return new Date();
  }

  function getUpcomingEvents() {
    const currentTime = getCurrentDateTime();

    const sortedEvents = eventsData
      .map((event) => {
        const eventDate = parseEventDate(event);
        return { ...event, eventDate };
      })
      .filter((event) => event.eventDate > currentTime)
      // @ts-ignore
      .sort((a, b) => a.eventDate - b.eventDate);

    return sortedEvents.slice(0, 3);
  }

  const dayToDisplay = getDayToDisplay();
  const classesForDay = findClassesForDay(dayToDisplay);
  const upcomingEvents = getUpcomingEvents();
</script>

<h1 class="text-2xl font-bold mb-4 text-tea_green-300">Upcoming Sections</h1>

<div class="flex flex-col sm:flex-row sm:space-x-4">
  <div
    class="bg-white shadow-lg p-4 rounded-lg border border-tea_green-300 w-full sm:w-1/2 mb-4 sm:mb-0"
  >
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
                  <i
                    class={`${subjectIcons[subject]} text-tea_green-500 text-xl mr-2`}
                  ></i>
                  {subjectFullNames[subject]}
                </td>
                <td class="px-4 py-2 break-words"
                  >{teacherFullNames[teacher]}</td
                >
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

  <div
    class="bg-white shadow-lg p-4 rounded-lg border border-tea_green-300 w-full sm:w-1/2"
  >
    <h2 class="text-xl font-bold mb-4">Upcoming Events</h2>
    {#if upcomingEvents.length > 0}
      <ul>
        {#each upcomingEvents as event}
          <li class="mb-4">
            <strong>{event.name}</strong><br />
            <em>{event.date} {event.time}</em><br />
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
    color: #3a9d88;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }

  th {
    background-color: #f0f8ff;
    font-weight: bold;
  }

  .table-auto td,
  .table-auto th {
    padding: 10px 12px;
  }

  i {
    margin-right: 8px;
  }

  @media (max-width: 640px) {
    .table-auto td,
    .table-auto th {
      padding: 8px;
    }
  }
</style>
