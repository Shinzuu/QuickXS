<!-- src/App.svelte -->

<style>
  header {
    background-color: theme('colors.primary'); /* Use custom color */
    color: theme('colors.base');
  }
  
  nav a {
    color: theme('colors.accent');
  }
  
  /* Mobile adjustments */
  @media (max-width: 640px) {
    .nav-item {
      display: block;
      margin: 8px 0;
    }
  }
</style>

<header class="p-4 shadow-md fixed w-full top-0">
  <nav class="flex justify-between">
    <h1 class="text-lg font-semibold text-neutral">My App</h1>
    <div class="space-x-4 flex">
      <a href="/" class="nav-item text-accent">Home</a>
      <a href="/routine" class="nav-item text-accent">Routine</a>
      <a href="/about" class="nav-item text-accent">About</a>
    </div>
  </nav>
</header>

<main class="pt-16 p-4 bg-neutral min-h-screen">
  <slot />
</main>
