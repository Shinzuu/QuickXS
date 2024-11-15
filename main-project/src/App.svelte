<script>
  import Routine from './routes/Routine.svelte';
  // @ts-ignore
  import Events from './routes/Events.svelte';  // Import the new Events component
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
      <button on:click={() => navigate('events')} class="text-tea_green-100">Events</button>
    </div>
  </nav>

  <!-- Main Content -->
  <main class="p-4 bg-beige text-tea_green-100">
    {#if currentRoute === 'home'}
      <h1 class="text-2xl font-bold text-tea_green-300">next classes</h1>
      <p class="text-buff-500">upcoming events</p>
    {:else if currentRoute === 'routine'}
      <Routine />
    {:else if currentRoute === 'events'}
      <Events />
    {/if}
  </main>
</div>
