<script>
  import routineData from '../data/routineData.json';

  const timeSlots = ["08:30", "09:45", "11:00", "12:15", "02:30", "03:45"];

  const courseIcons = {
    "MAD": "fas fa-mobile-alt", // Mobile Application Development
    "ISD": "fas fa-network-wired", // Information System Design
    "AI": "fas fa-robot", // Artificial Intelligence
    "AIL": "fas fa-laptop-code", // Artificial Intelligence Laboratory
    "OS": "fas fa-microchip", // Operating Systems
    "OSL": "fas fa-server", // Operating Systems Laboratory
    "COA": "fas fa-cogs", // Computer Organization & Architecture
    "STP": "fas fa-chart-line" // Statistics and Probability
  };

  const lecturerIcons = {
    "Ms. Tanni Dhoom (TDM)": "fas fa-chalkboard-teacher",
    "Dhrubajyoti Das (DD)": "fas fa-chalkboard-teacher",
    "Avisheak Das (AD)": "fas fa-chalkboard-teacher",
    "Shatabdi Roy Moon (SRM)": "fas fa-chalkboard-teacher",
    "Unknown (GH)": "fas fa-user-secret",
    "Unknown (AM)": "fas fa-user-secret"
  };

  function findClass(day, time) {
    const dayData = routineData.schedule.find(d => d.day === day);
    return dayData?.classes.find(c => c.time === time) || null;
  }

  function isContinuation(day, time) {
    const dayData = routineData.schedule.find(d => d.day === day);
    const index = dayData?.classes.findIndex(c => c.time === time);
    if (index > 0) {
      const previousClass = dayData.classes[index - 1];
      if (previousClass.duration > 75 && timeSlots.includes(time)) {
        const previousTimeIndex = timeSlots.indexOf(previousClass.time);
        const currentTimeIndex = timeSlots.indexOf(time);
        return currentTimeIndex > previousTimeIndex && currentTimeIndex <= previousTimeIndex + Math.floor(previousClass.duration / 75);
      }
    }
    return false;
  }
</script>

<style>
  /* Fixes for mobile view */
  .table-container {
    overflow-x: auto; /* Enable horizontal scrolling */
    -webkit-overflow-scrolling: touch; /* Smooth scrolling for iOS */
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px; /* Ensure minimum width for better readability */
  }

  th, td {
    padding: 1rem;
    text-align: center;
    border: 1px solid #d4a373; /* Adds a border for better visibility */
  }

  th {
    background-color: #ccd5ae; /* Tea green */
    color: #2d331a;
    font-weight: bold;
  }

  @media (max-width: 600px) {
    th, td {
      padding: 0.5rem;
      font-size: 0.85rem;
    }
  }
</style>

<h1 class="text-2xl font-bold mb-4 text-tea_green-300">Class Routine</h1>

<div class="table-container">
  <table class="bg-beige border border-tea_green-200 shadow-lg">
    <thead>
      <tr class="bg-tea_green-400 text-beige-100">
        <th>Day</th>
        {#each timeSlots as time}
          <th>{time}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each routineData.schedule as { day }}
        <tr class="even:bg-papaya_whip hover:bg-cornsilk">
          <td>{day}</td>
          {#each timeSlots as time}
            {#if findClass(day, time)}
              <td>
                <div class="font-semibold flex items-center justify-center">
                  <i class={courseIcons[findClass(day, time).subject]} style="margin-right: 0.5rem"></i>
                  {findClass(day, time).subject}
                </div>
                <div class="text-sm">{findClass(day, time).teacher}</div>
                <div class="text-xs">Room {findClass(day, time).classroom}</div>
              </td>
            {:else if isContinuation(day, time)}
              <td>
                <div class="text-xs text-gray-400">Continue</div>
              </td>
            {:else}
              <td>
                <div class="text-xs text-gray-400">No Class</div>
              </td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
