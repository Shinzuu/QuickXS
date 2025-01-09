<script>
  import routineData from "./data/routineData.json";
  import eventsData from "./data/eventsData.json";
  import { onMount } from "svelte";

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
    GH: "Dr. MD. Golam Hafez",
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
    daysOfWeek[
      (currentTime.getDay() - 1 + daysOfWeek.length) % daysOfWeek.length
    ];

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
    const scheduledDays = routineData.schedule.map((d) => d.day);

    const currentIndex = daysOfWeek.indexOf(currentDay);
    for (let i = 1; i <= daysOfWeek.length; i++) {
      const nextIndex = (currentIndex + i) % daysOfWeek.length;
      const nextDay = daysOfWeek[nextIndex];
      if (scheduledDays.includes(nextDay)) {
        return nextDay;
      }
    }

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

  let countdowns = {};

  function calculateCountdown(eventDate) {
    const now = new Date();
    const targetDate = new Date(eventDate);
    // @ts-ignore
    const diff = targetDate - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  function updateCountdowns() {
    upcomingEvents.forEach((event) => {
      countdowns[event.name] = calculateCountdown(event.eventDate);
    });
  }

  onMount(() => {
    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  });

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
    <h2 class="text-xl font-bold mb-4">Upcoming Events (3 Most Recent)</h2>
    {#if upcomingEvents.length > 0}
      <ul>
        {#each upcomingEvents as event}
          <li class="mb-4">
            <strong>{event.name}</strong><br />
            <em>{event.date} {event.time}</em><br />
            <p>{event.info}</p>
            <div class="text-gray-500 text-sm mt-2">
              {#if countdowns[event.name]}
                {countdowns[event.name].days}d
                {countdowns[event.name].hours}h
                {countdowns[event.name].minutes}m
                {countdowns[event.name].seconds}s remaining
              {/if}
            </div>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-gray-500">No upcoming events.</p>
    {/if}
  </div>
</div>

<!-- Mid Syllabus/Suggestions Section -->
<div
  class="bg-white shadow-lg p-4 rounded-lg border border-tea_green-300 w-full sm:w-full mt-4"
>
  <h2 class="text-xl font-bold mb-4">Mid Syllabus/Suggestions</h2>
  <div class="overflow-x-auto">
    <table class="min-w-full table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2 text-left" style="width: 5%;">Date</th>
          <th class="px-4 py-2 text-left" style="width: 10%;">Subject</th>
          <th class="px-4 py-2 text-left" style="width: 85%;">Syllabus</th>
        </tr>
      </thead>
      <tbody>
        <!-- Information System Design -->
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2" rowspan="4">11th</td>
          <td class="px-4 py-2" rowspan="4">
            <i class="fas fa-network-wired text-tea_green-500 text-xl mr-2"></i>
            ISD
          </td>
          <td class="px-4 py-2">mod 1: chap 1: Information And Management</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">mod 2: chap 3: Information Systems Analysis Overview (Software Development Life Cycle)</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">mod 3: chap 4: Information Gathering (System Requirement Specification)</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">mod 4: chap 6: Feasibility Analysis</td>
        </tr>

        <!-- Artificial Intelligence -->
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2" rowspan="5">12th</td>
          <td class="px-4 py-2" rowspan="5">
            <i class="fas fa-robot text-tea_green-500 text-xl mr-2"></i> AI
          </td>
          <td class="px-4 py-2">AI Introduction (definition and what not)</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">Game theory</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">Logics</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">Planning</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">NLP (IF-IDF **)</td>
        </tr>

        <!-- Statistics and Probability -->
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2" rowspan="5">13th</td>
          <td class="px-4 py-2" rowspan="5">
            <i class="fas fa-microchip text-tea_green-500 text-xl mr-2"></i> SAP
          </td>
          <td class="px-4 py-2">Mean, Median, Mode, Quartile</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">Standard Deviation, Mean Deviation, Variance</td
          >
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">Moments, Skewness, Kurtosis</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2"
            >Example : 25.7, 25.9, 25.11 ; Problem : 25.3
          </td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2"
            >Definition : SD, MD, V, Mean, Median, Mode, Quartile</td
          >
        </tr>

        <!-- Computer Organization and Architecture -->
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2" rowspan="5">14th</td>
          <td class="px-4 py-2" rowspan="5">
            <i class="fas fa-microchip text-tea_green-500 text-xl mr-2"></i> COA
          </td>
        </tr>
        <tr class="border-b border-gray-200"
          ><td class="px-4 py-2"
            >Basic Computer Organization & Design: Instruction Codes,
            Direct/Indirect Address</td
          ></tr
        >
        <tr class="border-b border-gray-200"
          ><td class="px-4 py-2"
            >Computer Registers and Bus systems, Computer Instruction</td
          ></tr
        >
        <tr class="border-b border-gray-200"
          ><td class="px-4 py-2"
            >Timing and Control, Instruction Cycle, Interrupts (Book: Morris
            Mano)</td
          ></tr
        >
        <tr class="border-b border-gray-200"
          ><td class="px-4 py-2"
            >Enhancing Performance with Pipelining: An overview of Pipelining, A
            Pipelined Datapath</td
          ></tr
        >

        <!-- Operating Systems -->
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2" rowspan="19">15th</td>
          <td class="px-4 py-2" rowspan="29">
            <i class="fas fa-microchip text-tea_green-500 text-xl mr-2"></i> OS</td
          >
          <td class="px-4 py-2">CH1 : OP basics + structure + data pass</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">CH1 : Multi-threaded processor system</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">CH1 : Cluster computing system</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2"
            >CH1 : Single, multi, and clustered systems (Definition &
            Comparison)</td
          >
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2"
            >CH1 : Computational Environments ( Mobile , Cloud , Edge ... all
            the different types)</td
          >
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">CH1 : Open source OS</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">CH2 : OS services and interfaces</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">CH2 : System call and types</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2"
            >CH2 : OS structure ( layered, micro, modular, hybrid ... detailed
            explanation with diagrams)</td
          >
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">CH3 : Processes</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2"
            >CH3 : Precess states , blocks (control and such) with diagrams</td
          >
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">CH3 : Context switching</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">CH3 : Process creation and termination</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">CH3 : Inter-process communication **</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2"
            >CH4 : Thread (models) definition, benefits, challenges
          </td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2"
            >CH4 : Multi threaded models (3) detailed explanation</td
          >
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">CH6 : Scheduling definition and types</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">CH6 : Scheduler, dispatcher </td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2"
            >CH6 : First come first serve & shortest job first algorithms **</td
          >
        </tr>
      </tbody>
    </table>
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
    padding: 0.5rem 0.75rem;
  }
</style>
