<script>
  // Define an array of colors using your custom palette
  const colors = [
    { name: "Tea Green", color: "bg-tea_green-500" },
    { name: "Beige", color: "bg-beige-500" },
    { name: "Cornsilk", color: "bg-cornsilk-500" },
    { name: "Papaya Whip", color: "bg-papaya_whip-500" },
    { name: "Buff", color: "bg-buff-500" }
  ];
</script>

<main class="p-8 space-y-4">
  <h1 class="text-2xl font-bold">Color Palette Showcase</h1>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    {#each colors as { name, color }}
      <div class={`h-24 ${color} flex items-center justify-center text-white font-semibold`}>
        {name}
      </div>
    {/each}
  </div>
</main>

<style>
  /* Add some default styling if desired */
  main {
    font-family: sans-serif;
  }
</style>
