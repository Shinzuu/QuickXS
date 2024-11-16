<script>
  import { onMount } from "svelte";
  import eventsData from "../data/eventsData.json"; // Path to your events data

  let events = [];

  function getCurrentTime() {
    return new Date();
  }

  function sortEvents(events) {
    const currentTime = getCurrentTime();
    return events.sort((a, b) => {
      const timeA = new Date(`${a.date} ${a.time.split(" - ")[0]}`);
      const timeB = new Date(`${b.date} ${b.time.split(" - ")[0]}`);
      // @ts-ignore
      return timeA - timeB; // Sort by closest upcoming
    });
  }

  function isPastEvent(event) {
    const eventTime = new Date(`${event.date} ${event.time.split(" - ")[1]}`);
    return eventTime < getCurrentTime();
  }

  onMount(() => {
    events = sortEvents(eventsData);
  });
</script>

<style>
/* Remove light green background */
.events-section {
  padding: 2rem 1rem;
}

/* White container with shadow */
.event-table {
  background-color: #ffffff; /* White center */
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
  -webkit-overflow-scrolling: touch; /* Smooth scrolling for iOS */
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* Ensures table scrolls on small screens */
}

th, td {
  padding: 0.75rem; /* Reduced padding for smaller rows */
  text-align: left;
  font-size: 0.9rem; /* Adjust font size for smaller screens */
}

th {
  background-color: #ccd5ae; /* Tea green */
  color: #2d331a;
  font-weight: bold;
  text-align: center;
}

td {
  text-align: center;
}

@media (max-width: 768px) {
  th, td {
    padding: 0.5rem; /* Reduce padding further for mobile */
    font-size: 0.8rem; /* Smaller font size */
  }
}

/* Styling for event rows */
.event-row {
  border-bottom: 1px solid #ccd5ae;
  transition: all 0.3s ease;
}

/* Past events */
.past-event {
  background-color: rgba(0, 0, 0, 0.05); /* Subtle gray */
  color: #aaa;
  filter: blur(0.8px);
  font-style: italic;
}

.past-event:hover {
  filter: none; /* Remove blur on hover */
  background-color: rgba(0, 0, 0, 0.1);
}

/* Upcoming events */
.upcoming-event {
  background-color: #f3f9f3; /* Light green */
}

.upcoming-event:nth-child(even) {
  background-color: #e0f2e0; /* Alternating row color */
}

.upcoming-event:hover {
  background-color: #d1e8d1; /* Slightly lighter green */
}
</style>

<div class="events-section">
  <div class="event-table">
    <!-- Title Section -->
    <h2 class="event-title">Upcoming Events</h2>

    <!-- Scrollable Wrapper -->
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
