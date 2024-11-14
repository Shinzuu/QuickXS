<!-- src/App.svelte -->
<script>
  import Routine from './routes/Routine.svelte';
  let currentRoute = 'home';

  function navigate(route) {
    currentRoute = route;
  }
</script>

<div class="app-wrapper">
  <nav class="p-4 bg-beige text-tea_green-100 flex justify-between items-center">
    <h1 class="text-xl font-bold text-tea_green-300">My Svelte Project</h1>
    <div>
      <button on:click={() => navigate('home')} class="mr-4 text-tea_green-100">Home</button>
      <button on:click={() => navigate('routine')} class="text-tea_green-100">Routine</button>
    </div>
  </nav>

  <main class="p-4 bg-beige text-tea_green-100">
    {#if currentRoute === 'home'}
      <h1 class="text-2xl font-bold text-tea_green-300">Welcome to My Svelte Project</h1>
      <p class="text-buff-500">Click "Routine" to view the class schedule.</p>
    {:else if currentRoute === 'routine'}
      <Routine />
    {/if}
  </main>
</div>
