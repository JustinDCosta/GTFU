# GTFU: Design System & UI Guidelines

## Visual Language
*   **Vibe:** Direct, clean, serious but encouraging. Modern and flat.
*   **Anti-Patterns:** NO AI-generated glassmorphism, no excessive drop shadows, no bubbly fonts. 
*   **Colors:**
    *   Background: Deep charcoal or absolute black (e.g., `#121212`) for dark mode, crisp off-white (`#F8F9FA`) for light mode.
    *   Primary Action (The Button): A bold, urgent color like burnt orange (`#FF5722`) or a stark, high-contrast monochrome button.
    *   Text: High contrast (White/Black).
*   **Typography:** Sans-serif, geometric, bold headings (e.g., Inter, Roboto, or system default).

## Component Structure
1.  **Home Screen (`/app/index.js`):**
    *   Top: Subtle login/profile icon.
    *   Center: "Times you GTFU" big counter.
    *   Middle: The main action button (Text: "Initiate").
    *   Bottom: The rotating quote block.
2.  **Timer State Screen:**
    *   Full screen takes over, showing just the countdown: "3... 2... 1... GO."
3.  **Profile/Settings Modal:**
    *   Login/Signup forms (Email/Password).
    *   Slider or input to change custom timer length (1s to 10s).