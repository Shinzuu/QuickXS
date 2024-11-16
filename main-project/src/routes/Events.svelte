<script>
  import { onMount } from "svelte";
  import eventsData from "../data/eventsData.json"; // Ensure this path is correct

  let events = [];

  // Get current time (date and time)
  function getCurrentTime() {
    return new Date();
  }

  // Sort events based on time (upcoming first)
  function sortEvents(events) {
    const currentTime = getCurrentTime();
    return events.sort((a, b) => {
      const timeA = new Date(`${a.date} ${a.time.split(" - ")[0]}`);
      const timeB = new Date(`${b.date} ${b.time.split(" - ")[0]}`);
      // @ts-ignore
      return timeA - timeB; // Sort by closest upcoming event
    });
  }

  // Check if the event is past
  function isPastEvent(event) {
    const currentTime = getCurrentTime();
    let eventEndTime = new Date(`${event.date} ${event.time.split(" - ")[1]}`);
    
    // Handle edge cases where time might be incorrectly formatted
    // @ts-ignore
    if (isNaN(eventEndTime)) {
      eventEndTime = currentTime; // If the event time is invalid, treat it as past
    }

    return eventEndTime < currentTime;
  }

  // Load events on mount and sort them
  onMount(() => {
    events = sortEvents(eventsData);
  });
</script>

<style>
/* Event styles */
.events-section {
  padding: 2rem 1rem;
}

.event-table {
  background-color: #ffffff;
  margin: 0 auto;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .event-table {
    max-width: 95%;
  }
}

/* Scrollable table wrapper */
.scrollable-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  font-size: 0.9rem;
}

th {
  background-color: #ccd5ae;
  color: #2d331a;
  font-weight: bold;
  text-align: center;
}

td {
  text-align: center;
}

@media (max-width: 768px) {
  th, td {
    padding: 0.5rem;
    font-size: 0.8rem;
  }
}

/* Event row styles */
.event-row {
  border-bottom: 1px solid #ccd5ae;
  transition: all 0.3s ease;
}

/* Past events */
.past-event {
  background-color: rgba(255, 99, 71, 0.2);  /* Tomato color with transparency */
  color: #6c757d;  /* Grey color for text */
  filter: blur(1px);  /* Slight blur for past events */
  font-style: italic;
  opacity: 0.7;  /* Light opacity to make past events less prominent */
}

.past-event:hover {
  filter: none;
  background-color: rgba(255, 99, 71, 0.3);  /* Slightly more visible on hover */
  opacity: 1;  /* Full opacity on hover for better visibility */
}

/* Upcoming events */
.upcoming-event {
  background-color: #f3f9f3;
}

.upcoming-event:nth-child(even) {
  background-color: #e0f2e0;
}

.upcoming-event:hover {
  background-color: #d1e8d1;
}
</style>

<h1 class="text-2xl font-bold mb-4 text-tea_green-300">Upcoming Events</h1>
<div class="events-section">
  <div class="event-table">
    <div class="scrollable-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Time</th>
            <th>Name</th>
            <th>Info</th>
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
  </div>
</div>
