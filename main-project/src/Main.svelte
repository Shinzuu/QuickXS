<script>
  import routineData from "./data/routineData.json";
  import eventsData from "./data/eventsData.json";
  import { onMount } from "svelte";

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Updated subject names for your current semester
  const subjectFullNames = {
    "CSE 3000": "Software Development Project",
    "CSE 3233": "Software Engineering",
    "CSE 3234": "Software Engineering Laboratory",
    "CSE 3567": "Computer Networks",
    "CSE 3568": "Computer Networks Laboratory",
    "CSE 3637": "Computer and Cyber Security",
    "EEE 4427": "Data Communication",
    "MGT 3301": "Project Management and Entrepreneurship"
  };

  // (Optional) Add teacher full names here if you have them
  const teacherFullNames = {
    // Example: "FK": "Full Name", "SMAI": "Full Name", etc.
  };

  // (Optional) Add subject icons here if you like
  const subjectIcons = {
    // Example: "CSE 3000": "fas fa-project-diagram"
  };

  // Get today's day index (Monday = 0)
  const now = new Date();
  const today = daysOfWeek[(now.getDay() + 6) % 7];

  function parseTimeTo24Hour(timeStr) {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return { hours, minutes };
  }

  function getClassesForDay(day) {
    const entry = routineData.schedule.find(d => d.day === day);
    if (!entry) return [];
    return entry.classes.map(c => {
      const { hours, minutes } = parseTimeTo24Hour(c.time);
      return { ...c, hours, minutes };
    });
  }

  function getUpcomingEvents() {
    const now = new Date();
    return eventsData
      .map(e => ({ ...e, dateObj: new Date(e.date + ' ' + e.time.split(' - ')[0]) }))
      .filter(e => e.dateObj > now)
      .sort((a, b) => a.dateObj - b.dateObj)
      .slice(0, 3);
  }

  let countdowns = {};

  function calcCountdown(target) {
    const diff = new Date(target) - new Date();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { d, h, m, s };
  }

  const dayToShow = today;
  const classesForDay = getClassesForDay(dayToShow);
  const upcomingEvents = getUpcomingEvents();

  onMount(() => {
    const update = () => {
      upcomingEvents.forEach(e => { countdowns[e.name] = calcCountdown(e.dateObj); });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  });
</script>


<h1 class="text-2xl font-bold mb-4 text-tea_green-300">Upcoming Sections</h1>
<div class="flex flex-col sm:flex-row sm:space-x-4">
  <div class="card w-full sm:w-1/2 mb-4">
    <h2 class="text-xl font-bold mb-4">Classes for {dayToShow}</h2>
    {#if classesForDay.length}
      <div class="overflow-x-auto">
        <table class="min-w-full table-auto">
          <thead>
            <tr><th>Time</th><th>Subject</th><th>Teacher</th><th>Classroom</th><th>Duration</th></tr>
          </thead>
          <tbody>
            {#each classesForDay as c}
              <tr>
                <td>{c.time}</td>
                <td class="flex items-center">
                  <i class={`${subjectIcons[c.subject]} mr-2`}></i>
                  {subjectFullNames[c.subject] || c.subject}
                </td>
                <td>{teacherFullNames[c.teacher] || c.teacher}</td>
                <td>{c.classroom}</td>
                <td>{c.duration} min</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p class="text-gray-500">No classes scheduled.</p>
    {/if}
  </div>

  <div class="card w-full sm:w-1/2">
    <h2 class="text-xl font-bold mb-4">Upcoming Events</h2>
    {#if upcomingEvents.length}
      <ul>
        {#each upcomingEvents as evt}
          <li class="mb-4">
            <strong>{evt.name}</strong><br>
            <em>{evt.date} {evt.time}</em>
            <div class="mt-2 text-sm text-gray-500">
              {countdowns[evt.name]?.d}d {countdowns[evt.name]?.h}h {countdowns[evt.name]?.m}m {countdowns[evt.name]?.s}s
            </div>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-gray-500">No upcoming events.</p>
    {/if}
  </div>
</div>

<style>
  .text-tea_green-300 { color: #3a9d88; }
  .card { background: #fff; padding: 1rem; border: 1px solid #3a9d88; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
  table { width: 100%; border-collapse: collapse; }
  th, td { padding: 0.5rem; border-bottom: 1px solid #e0e0e0; text-align: left; }
  th { background: #f0f8ff; font-weight: bold; }
</style>
