<script>
    // You can add any JavaScript logic here if needed
  </script>
  
  <footer class="footer">
    <!-- GitHub Profile Link -->
    <a href="https://github.com/Shinzuu" target="_blank" class="footer-link">
      <i class="fab fa-github"></i>
    </a>
  
    <!-- Source Code Link -->
    <a href="https://github.com/Shinzuu/QuickXS" target="_blank" class="footer-link">
      <i class="fas fa-code"></i>
    </a>
  </footer>
  
  <style>
    /* Enhanced footer styles */
    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 25px;
      padding: 10px 20px;
      z-index: 10;
      text-align: center;
      box-sizing: border-box;
      border-radius: 15px 15px 0 0; /* Rounded top corners */
      box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.3); /* Subtle shadow */
    }
  
    .footer-link {
      color: rgb(141, 179, 122);
      text-decoration: none;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      transition: color 0.3s ease, transform 0.3s ease;
    }
  
    .footer-link:hover {
      color: #ffcc00; /* Golden color on hover */
      transform: translateY(-2px); /* Slight lifting effect */
    }
  
    .footer i {
      font-size: 1.6rem; /* Larger icon size */
      transition: transform 0.3s ease;
    }
  
    .footer-link:hover i {
      transform: scale(1.2); /* Slight zoom-in effect on icons */
    }
  
    /* Mobile responsiveness: Show only icons and make them smaller */
    @media (max-width: 768px) {
      .footer {
        flex-direction: row; /* Keep the layout horizontal */
        padding: 10px 15px;
      }
  
      .footer-link {
        font-size: 1.6rem; /* Larger icon size for mobile */
        margin: 0 10px; /* Space between icons */
      }
  
      /* Optionally, you can hide text on mobile if needed */
      .footer-link i {
        font-size: 1.8rem; /* Increase icon size for better visibility */
      }
    }
  </style>
  