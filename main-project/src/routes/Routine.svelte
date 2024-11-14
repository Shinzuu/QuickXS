<script>
  import routineData from '../data/routineData.json';

  // Define the time slots as needed
  const timeSlots = [
    "08:30", "09:45", "11:00", "12:15", "02:30", "03:45"
  ];

  // Mapping course abbreviations to icons
  const courseIcons = {
    "MAD": "fas fa-mobile-alt", // Mobile Application Development
    "ISD": "fas fa-network-wired", // Information System Design
    "AI": "fas fa-robot", // Artificial Intelligence
    "AI Lab": "fas fa-laptop-code", // Artificial Intelligence Laboratory
    "OS": "fas fa-microchip", // Operating Systems
    "OS Lab": "fas fa-server", // Operating Systems Laboratory
    "COA": "fas fa-cogs", // Computer Organization & Architecture
    "Stats & Prob": "fas fa-chart-line" // Statistics and Probability
  };

  // Mapping lecturer names to their initials (you can modify this)
  const lecturerIcons = {
    "Dr. John Doe": "fas fa-chalkboard-teacher", 
    "Prof. Jane Smith": "fas fa-chalkboard-teacher"
    // Add other lecturers and their icons as needed
  };

  // Function to find the class for a given day and time
  function findClass(day, time) {
    const dayData = routineData.schedule.find(d => d.day === day);
    return dayData?.classes.find(c => c.time === time) || null;
  }
</script>

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
          <td class="p-2 border-b border-tea_green-200 text-tea_green-100 text-center align-middle">
            {#if findClass(day, time)}
              <div class="font-semibold flex items-center justify-center">
                <!-- Add the icon dynamically -->
                <i class={courseIcons[findClass(day, time).subject]} style="margin-right: 0.5rem"></i>
                {findClass(day, time).subject}
              </div>
              <div class="text-sm">{findClass(day, time).teacher}</div>
              <div class="text-xs">Room {findClass(day, time).classroom}</div>
            {:else}
              <div class="text-xs text-gray-400">No Class</div>
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<!-- Full form of course abbreviations -->
<div class="mt-4 flex justify-between">
  <div>
    <h2 class="text-xl font-semibold text-tea_green-300">Course Abbreviations</h2>
    <ul class="list-disc pl-6 text-tea_green-100">
      <li><strong>MAD:</strong> Mobile Application Development <i class="fas fa-mobile-alt"></i></li>
      <li><strong>ISD:</strong> Information System Design <i class="fas fa-network-wired"></i></li>
      <li><strong>AI:</strong> Artificial Intelligence <i class="fas fa-robot"></i></li>
      <li><strong>AI Lab:</strong> Artificial Intelligence Laboratory <i class="fas fa-laptop-code"></i></li>
      <li><strong>OS:</strong> Operating Systems <i class="fas fa-microchip"></i></li>
      <li><strong>OS Lab:</strong> Operating Systems Laboratory <i class="fas fa-server"></i></li>
      <li><strong>COA:</strong> Computer Organization & Architecture <i class="fas fa-cogs"></i></li>
      <li><strong>Stats & Prob:</strong> Statistics and Probability <i class="fas fa-chart-line"></i></li>
    </ul>
  </div>

  <!-- Lecturer's name and abbreviation section -->
  <div>
    <h2 class="text-xl font-semibold text-tea_green-300">Lecturer Abbreviations</h2>
    <ul class="list-disc pl-6 text-tea_green-100">
      <li><strong>Dr. John Doe:</strong> <i class="fas fa-chalkboard-teacher"></i></li>
      <li><strong>Prof. Jane Smith:</strong> <i class="fas fa-chalkboard-teacher"></i></li>
      <!-- Add more lecturers as needed -->
    </ul>
  </div>
</div>
