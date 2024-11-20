<script>
  import routineData from "../data/routineData.json";

  const timeSlots = ["08:30", "09:45", "11:00", "12:15", "02:30", "03:45"];

  const courseIcons = {
    MAD: "fas fa-mobile-alt", // Mobile Application Development
    ISD: "fas fa-network-wired", // Information System Design
    AI: "fas fa-robot", // Artificial Intelligence
    AIL: "fas fa-laptop-code", // Artificial Intelligence Laboratory
    OS: "fas fa-microchip", // Operating Systems
    OSL: "fas fa-server", // Operating Systems Laboratory
    COA: "fas fa-cogs", // Computer Organization & Architecture
    SAP: "fas fa-chart-line", // Statistics and Probability
  };

  const lecturerIcons = {
    "Ms. Tanni Dhoom (TDM)": "fas fa-chalkboard-teacher",
    "Dhrubajyoti Das (DD)": "fas fa-chalkboard-teacher",
    "Avisheak Das (AD)": "fas fa-chalkboard-teacher",
    "Shatabdi Roy Moon (SRM)": "fas fa-chalkboard-teacher",
    "Unknown (GH)": "fas fa-user-secret",
    "Asif Mohammad (AM)": "fas fa-chalkboard-teacher",
  };

  function findClass(day, time) {
    const dayData = routineData.schedule.find((d) => d.day === day);
    return dayData?.classes.find((c) => c.time === time) || null;
  }

  function isContinuation(day, time) {
    const dayData = routineData.schedule.find((d) => d.day === day);
    const index = dayData?.classes.findIndex((c) => c.time === time);
    if (index > 0) {
      const previousClass = dayData.classes[index - 1];
      if (previousClass.duration > 75 && timeSlots.includes(time)) {
        const previousTimeIndex = timeSlots.indexOf(previousClass.time);
        const currentTimeIndex = timeSlots.indexOf(time);
        return (
          currentTimeIndex > previousTimeIndex &&
          currentTimeIndex <=
            previousTimeIndex + Math.floor(previousClass.duration / 75)
        );
      }
    }
    return false;
  }
</script>

<h1 class="text-2xl font-bold mb-4 text-tea_green-300">Class Routine</h1>

<div class="table-container">
  <table class="bg-white border border-tea_green-200 shadow-lg">
    <thead>
      <tr class="bg-tea_green-400 text-white">
        <th>Day</th>
        {#each timeSlots as time}
          <th>{time}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each routineData.schedule as { day }}
        <tr class=" hover:bg-cornsilk">
          <td>{day}</td>
          {#each timeSlots as time}
            {#if findClass(day, time)}
              <td>
                <div class="font-semibold flex items-center justify-center">
                  <i class={`${courseIcons[findClass(day, time).subject]} icon`}
                  ></i>
                  {findClass(day, time).subject}
                </div>
                <div class="class-info">{findClass(day, time).teacher}</div>
                <div class="class-info">
                  Room {findClass(day, time).classroom}
                </div>
              </td>
            {:else if isContinuation(day, time)}
              <td class="continue-row">
                <div class="text-xs text-gray-400">Continue</div>
              </td>
            {:else}
              <td class="no-class-row">
                <div class="text-xs text-gray-400">No Class</div>
              </td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  /* Adjusting the layout for mobile view */
  .table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px; /* Ensures table scrolls on small screens */
    background-color: #ffffff; /* White background for table */
    border-radius: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  }

  th,
  td {
    padding: 1rem;
    text-align: center;
    border: 1px solid #ccd5ae; /* Border for better visibility */
  }

  th {
    background-color: #ccd5ae; /* Tea green */
    color: #2d331a;
    font-weight: bold;
  }

  td {
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    th,
    td {
      padding: 0.75rem;
      font-size: 0.8rem;
    }
  }

  /* Styling for row colors */
  .even {
    background-color: #f0f8f4; /* Light greenish */
  }

  .even:hover {
    background-color: #d1e8d1; /* Slightly lighter on hover */
  }

  .continue-row {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .no-class-row {
    background-color: #f9f9f9; /* Very light gray */
  }

  .class-info {
    font-size: 0.85rem;
    color: #555;
  }

  .icon {
    margin-right: 0.5rem;
  }
</style>
