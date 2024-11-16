<script>
  import Routine from './routes/Routine.svelte';
  import Events from './routes/Events.svelte';
  import Links from './routes/Links.svelte';
  import Main from './Main.svelte';  // Import the Main component
  import Footer from './Footer.svelte'; 

  let currentRoute = 'home';
  let isMenuOpen = false;

  function navigate(route) {
    currentRoute = route;
    isMenuOpen = false; // Close menu after navigation
  }
</script>

<style>
  .menu-button {
    font-size: 1.5rem;
    background-color: #ccd5ae; /* Tea green */
    color: #5b6635; /* Dark green */
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .menu-button:hover {
    background-color: #b3c146;
  }

  .nav-links {
    display: flex;
    gap: 1rem;
  }

  .mobile-menu {
    display: none;
    flex-direction: column;
    gap: 1rem;
    background-color: #f3f9f3;
    padding: 1rem;
    position: absolute;
    top: 4rem;
    right: 1rem;
    border: 1px solid #ccd5ae;
    border-radius: 0.5rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .mobile-menu a {
    text-decoration: none;
    font-weight: bold;
    color: #5b6635;
  }

  .mobile-menu a:hover {
    color: #b3c146;
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none; /* Hide desktop links */
    }

    .mobile-menu {
      display: flex;
    }
  }
</style>

<div class="app-wrapper">
  <!-- Navbar -->
  <nav class="p-4 bg-beige text-tea_green-100 flex justify-between items-center">
    <h1 class="text-xl font-bold text-tea_green-300">QuickXS</h1>

    <!-- Desktop Links -->
    <div class="nav-links">
      <button on:click={() => navigate('home')} class="text-tea_green-100">Home</button>
      <button on:click={() => navigate('routine')} class="text-tea_green-100">Routine</button>
      <button on:click={() => navigate('events')} class="text-tea_green-100">Events</button>
      <button on:click={() => navigate('links')} class="text-tea_green-100">Links</button>
    </div>

    <!-- Mobile Menu Button -->
    <button class="menu-button lg:hidden" on:click={() => (isMenuOpen = !isMenuOpen)}>
      <i class="fas fa-bars"></i>
    </button>

    <!-- Mobile Menu -->
    {#if isMenuOpen}
      <div class="mobile-menu">
        <a href="#" on:click={() => navigate('home')}>Home</a>
        <a href="#" on:click={() => navigate('routine')}>Routine</a>
        <a href="#" on:click={() => navigate('events')}>Events</a>
        <a href="#" on:click={() => navigate('links')}>Links</a>
      </div>
    {/if}
  </nav>

  <!-- Main Content -->
  <main class="p-4 bg-beige text-tea_green-100">
    {#if currentRoute === 'home'}
      <Main />  <!-- Display Main component for home route -->
    {:else if currentRoute === 'routine'}
      <Routine />
    {:else if currentRoute === 'events'}
      <Events />
    {:else if currentRoute === 'links'}
      <Links />
    {/if}
  </main>
</div>

<Footer />
