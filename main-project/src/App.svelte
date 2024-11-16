<script>
  import Routine from './routes/Routine.svelte';
  import Events from './routes/Events.svelte';
  import Links from './routes/Links.svelte';  
  let currentRoute = 'home';

  function navigate(route) {
    currentRoute = route;
  }
</script>

<div class="app-wrapper">
  <!-- Navbar -->
  <nav class="p-4 bg-beige text-tea_green-100 flex justify-between items-center">
    <h1 class="text-xl font-bold text-tea_green-300">QuickXS</h1>
    <div>
      <button on:click={() => navigate('home')} class="mr-4 text-tea_green-100">Home</button>
      <button on:click={() => navigate('routine')} class="mr-4 text-tea_green-100">Routine</button>
      <button on:click={() => navigate('events')} class="mr-4 text-tea_green-100">Events</button>
      <button on:click={() => navigate('links')} class="text-tea_green-100">Links</button>
    </div>
  </nav>

  <!-- Main Content -->
  <main class="p-4 bg-beige text-tea_green-100">
    {#if currentRoute === 'home'}
      <h1 class="text-2xl font-bold text-tea_green-300">Next Classes</h1>
      <p class="text-buff-500">Upcoming Events</p>
    {:else if currentRoute === 'routine'}
      <Routine />
    {:else if currentRoute === 'events'}
      <Events />
    {:else if currentRoute === 'links'}
      <Links />
    {/if}
  </main>
</div>
