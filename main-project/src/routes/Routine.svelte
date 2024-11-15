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

  .abbreviation-list {
    display: flex;
    gap: 2rem; /* Adjusts the space between the two lists */
    align-items: flex-start;
  }
  .abbreviation-column {
    flex: 1;
  }
  .abbreviation-column ul {
    margin-top: 0.5rem;
  }
</style>

<h1 class="text-2xl font-bold mb-4 text-tea_green-300">Class Routine</h1>

<table class="w-full bg-beige border border-tea_green-200 shadow-lg">
  <thead>
    <tr class="bg-tea_green-400 text-beige-100">
      <th class="p-2 border-b-2 border-tea_green-500 text-center">Day</th>
      {#each timeSlots as time}
        <th class="p-2 border-b-2 border-tea_green-500 text-center">{time}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each routineData.schedule as { day }}
      <tr class="even:bg-papaya_whip hover:bg-cornsilk">
        <td class="p-2 border-b border-tea_green-200 text-tea_green-100 text-center align-middle">{day}</td>
        
        {#each timeSlots as time}
          {#if findClass(day, time)}
            <td class="p-2 border-b border-tea_green-200 text-tea_green-100 text-center align-middle">
              <div class="font-semibold flex items-center justify-center">
                <i class={courseIcons[findClass(day, time).subject]} style="margin-right: 0.5rem"></i>
                {findClass(day, time).subject}
              </div>
              <div class="text-sm">{findClass(day, time).teacher}</div>
              <div class="text-xs">Room {findClass(day, time).classroom}</div>
            </td>
          {:else if isContinuation(day, time)}
            <td class="p-2 border-b border-tea_green-200 text-tea_green-100 text-center align-middle">
              <div class="text-xs text-gray-400">Continue</div>
            </td>
          {:else}
            <td class="p-2 border-b border-tea_green-200 text-tea_green-100 text-center align-middle">
              <div class="text-xs text-gray-400">No Class</div>
            </td>
          {/if}
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<!-- Course and lecturer abbreviation legend -->
<div class="abbreviation-list mt-8">
  <div class="abbreviation-column">
    <h2 class="text-xl font-semibold text-tea_green-300">Course Abbreviations</h2>
    <ul class="list-disc pl-6 text-tea_green-100">
      <li><strong>MAD:</strong> Mobile Application Development <i class="fas fa-mobile-alt"></i></li>
      <li><strong>ISD:</strong> Information System Design <i class="fas fa-network-wired"></i></li>
      <li><strong>AI:</strong> Artificial Intelligence <i class="fas fa-robot"></i></li>
      <li><strong>AIL:</strong> Artificial Intelligence Laboratory <i class="fas fa-laptop-code"></i></li>
      <li><strong>OS:</strong> Operating Systems <i class="fas fa-microchip"></i></li>
      <li><strong>OSL:</strong> Operating Systems Laboratory <i class="fas fa-server"></i></li>
      <li><strong>COA:</strong> Computer Organization & Architecture <i class="fas fa-cogs"></i></li>
      <li><strong>Stats & Prob:</strong> Statistics and Probability <i class="fas fa-chart-line"></i></li>
    </ul>
  </div>

  <div class="abbreviation-column">
    <h2 class="text-xl font-semibold text-tea_green-300">Lecturer Abbreviations</h2>
    <ul class="list-disc pl-6 text-tea_green-100">
      <li><strong>Ms. Tanni Dhoom (TDM):</strong> <i class="fas fa-chalkboard-teacher"></i></li>
      <li><strong>Dhrubajyoti Das (DD):</strong> <i class="fas fa-chalkboard-teacher"></i></li>
      <li><strong>Avisheak Das (AD):</strong> <i class="fas fa-chalkboard-teacher"></i></li>
      <li><strong>Shatabdi Roy Moon (SRM):</strong> <i class="fas fa-chalkboard-teacher"></i></li>
      <li><strong>Unknown (GH):</strong> <i class="fas fa-user-secret"></i></li>
      <li><strong>Unknown (AM):</strong> <i class="fas fa-user-secret"></i></li>
    </ul>
  </div>
</div>
