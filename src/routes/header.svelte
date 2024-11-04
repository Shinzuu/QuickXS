<script>
    let isMobileMenuOpen = false;

    const navItems = [
        { name: "Home", link: "/", icon: "fas fa-home" },
        { name: "Routine", link: "/routine", icon: "fas fa-calendar-check" },
        { name: "Events", link: "/events", icon: "fas fa-bell" },
        { name: "DocX", link: "/docx", icon: "fas fa-file-alt" }
    ];

    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }
</script>

<header class="bg-blue-600 text-white shadow-lg rounded-full mx-auto my-4 px-6 py-3 flex items-center justify-center w-1/4 fixed top-4 right-4">
    <!-- Desktop Navigation (Right-Aligned and Spaced Evenly) -->
    <nav class="hidden md:flex space-x-8">
        {#each navItems as item}
            <a href={item.link} class="flex items-center space-x-2 hover:text-blue-300">
                <i class={item.icon}></i> <!-- Icon for each item -->
                <span>{item.name}</span>
            </a>
        {/each}
    </nav>

    <!-- Mobile Menu Button (Only Visible on Small Screens) -->
    <button class="md:hidden focus:outline-none ml-4" on:click={toggleMobileMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </button>

    <!-- Mobile Navigation Menu -->
    {#if isMobileMenuOpen}
        <nav class="md:hidden bg-blue-700 rounded-b-full space-y-2 py-2 px-6 mt-2">
            {#each navItems as item}
                <a href={item.link} class="flex items-center space-x-2 block px-4 py-2 hover:bg-blue-800 rounded-full">
                    <i class={item.icon}></i> <!-- Icon for each mobile item -->
                    <span>{item.name}</span>
                </a>
            {/each}
        </nav>
    {/if}
</header>
