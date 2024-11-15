<script>
    import { onMount } from "svelte";
    import eventsData from "../data/eventsData.json"; // Path to your events data
  
    let events = [];
  
    // Helper function to get the current time in a comparable format
    function getCurrentTime() {
      return new Date();
    }
  
    // Sort function to order events by nearest to the current time
    function sortEvents(events) {
      const currentTime = getCurrentTime();
      
      return events.sort((a, b) => {
        const timeA = new Date(`${a.date} ${a.time.split(" - ")[0]}`);
        const timeB = new Date(`${b.date} ${b.time.split(" - ")[0]}`);
        
        // Sort by the closest upcoming event
        // @ts-ignore
        return timeA - timeB;
      });
    }
  
    // Format event for checking if it's in the past
    function isPastEvent(event) {
      const eventTime = new Date(`${event.date} ${event.time.split(" - ")[1]}`);
      return eventTime < getCurrentTime();
    }
  
    // Load events and sort them
    onMount(() => {
      events = sortEvents(eventsData);
    });
</script>

<style>
  /* Use the app's existing styling from app.css */
  .event-row {
    padding: 0.75rem;
    border-bottom: 1px solid #ccd5ae; /* Tea green border */
    transition: all 0.3s ease;
  }

  /* Styling for past events */
  .past-event {
    background-color: rgba(0, 0, 0, 0.1); /* Subtle dark background for past events */
    filter: blur(1px); /* Blur effect for past events */
    color: #aaa; /* Dimmed text color */
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2); /* Dark shadow for depth */
  }

  .past-event:hover {
    filter: none; /* Remove blur on hover */
    background-color: rgba(0, 0, 0, 0.2); /* Darken background on hover */
  }

  /* Styling for upcoming events */
  .upcoming-event {
    background-color: #f3f9f3; /* Light green background */
  }

  .upcoming-event:nth-child(even) {
    background-color: #e0f2e0; /* Slightly darker green for alternating rows */
  }

  .upcoming-event:hover {
    background-color: #d1e8d1; /* Slightly lighter green on hover */
  }

  /* Title styles for the event table */
  .event-title {
    font-size: 2.5rem; /* Adjust size for consistency with Routine */
    font-weight: bold;
    color: #5b6635; /* Dark green for the title */
    margin-bottom: 1.5rem;
    transition: color 0.3s ease;
  }

  .event-title:hover {
    color: #b3c146; /* Hover effect */
  }

  /* Table styling */
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 1rem;
    text-align: left;
  }

  th {
    background-color: #ccd5ae; /* Tea green for header */
    color: #2d331a;
    font-weight: 600;
  }
</style>

<div class="event-table">
  <!-- Title Section -->
  <h2 class="event-title text-tea_green-300">Upcoming Events</h2>

  <table class="w-full bg-beige border border-tea_green-200 shadow-lg">
    <thead>
      <tr class="bg-tea_green-400 text-beige-100">
        <th class="p-2 border-b-2 border-tea_green-500 text-center">#</th>
        <th class="p-2 border-b-2 border-tea_green-500 text-center">Date</th>
        <th class="p-2 border-b-2 border-tea_green-500 text-center">Time</th>
        <th class="p-2 border-b-2 border-tea_green-500 text-center">Name</th>
        <th class="p-2 border-b-2 border-tea_green-500 text-center">Info</th>
      </tr>
    </thead>
    <tbody>
      {#each events as event, index (event.name)}
        <tr class="event-row {isPastEvent(event) ? 'past-event' : 'upcoming-event'}">
          <td>{index + 1}</td>
          <td>{event.date}</td>
          <td>{event.time}</td>
          <td>{event.name}</td>
          <td>{event.info || "No information available"}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
