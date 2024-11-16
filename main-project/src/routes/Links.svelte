<script>
    import linksData from '../data/linksData.json'; // JSON file containing dynamic links
    
    let staticLinks = [
      {
        name: "University Student Portal",
        url: "http://101.2.163.149/studenteng/Signin.aspx",
        icon: "fas fa-university",
      }
    ];
  </script>
  
  <style>
    .links-container {
      width: 60%;
      margin: 0 auto;
      background-color: #f3f9f3; /* Light green background */
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: width 0.3s ease;
    }
  
    @media (max-width: 768px) {
      .links-container {
        width: 90%;
      }
    }
  
    .link-wrapper {
      padding: 1rem;
      border: 1px solid #ccd5ae; /* Tea green border */
      background-color: #f3f9f3;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      transition: background-color 0.3s ease;
    }
  
    .link-wrapper:hover {
      background-color: #e0f2e0;
    }
  
    .link-icon {
      margin-right: 0.75rem;
      font-size: 1.25rem;
      color: #5b6635;
    }
  
    .link-text {
      font-size: 1rem;
      font-weight: bold;
      color: #2d331a;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      transition: color 0.3s ease;
    }
  
    .link-text:hover {
      color: #b3c146;
    }
  
    .links-title {
      font-size: 2rem;
      font-weight: bold;
      color: #5b6635; /* Dark green */
      margin-bottom: 1rem;
      text-align: center;
    }
  
    .section-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #5b6635; /* Dark green */
      margin-top: 2rem;
      margin-bottom: 0.5rem;
    }
  </style>
  
  <div class="links-container">
    <!-- Title -->
    <h2 class="links-title">Academic Links</h2>
  
    <!-- Static Links Section -->
    {#each staticLinks as staticLink}
      <div class="link-wrapper">
        <i class={staticLink.icon + " link-icon"}></i>
        <a class="link-text" href={staticLink.url} target="_blank" rel="noopener noreferrer">
          {staticLink.name} <i class="fas fa-external-link-alt"></i>
        </a>
      </div>
    {/each}
  
    <!-- Dynamic Links Section -->
    {#if linksData.length > 0}
      <h3 class="section-title">Notes and Resources</h3>
      {#each linksData as dynamicLink}
        <div class="link-wrapper">
          <i class="fas fa-sticky-note link-icon"></i>
          <a class="link-text" href={dynamicLink.url} target="_blank" rel="noopener noreferrer">
            {dynamicLink.name} <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      {/each}
    {/if}
  </div>
  