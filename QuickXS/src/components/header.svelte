<!-- src/componenets/header.svelte -->

<script>
    // If you want to handle navigation in Svelte, you can import a router here.
    // For now, this component includes basic buttons.
</script>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: #333; /* Dark background color */
        color: white;
    }

    nav {
        display: flex;
        gap: 1.5rem;
    }

    .nav-button {
        color: white;
        background: none;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        padding: 0.5rem;
        transition: color 0.3s ease;
    }

    .nav-button:hover {
        color: #ddd; /* Light color on hover */
    }
</style>

<header>
    <!-- Site Logo or Title -->
    <div>
        <h1>QuickXS</h1>
    </div>

    <!-- Navigation Buttons -->
    <nav>
        <button class="nav-button">Home</button>
        <button class="nav-button">Routine</button>
        <button class="nav-button">Events</button>
        <button class="nav-button">Docs</button>
    </nav>
</header>
