# GTFU: Logic & Data

## Quote List
GTFU should pull from an array of motivational quotes. They should focus on discipline, not toxic hustle culture.
*   "Action precedes motivation."
*   "You don't have to feel like it to do it."
*   "The hardest part is standing up."
*   "Five minutes of discomfort beats a day of regret."
*   "Stop negotiating with yourself."
*   "Momentum builds the moment you move."

## Timer Logic Requirements
*   When the "Initiate" button is pressed, replace the UI with a full-screen countdown.
*   Use `setInterval` or React Native's `Animated` API for the countdown visual.
*   Upon reaching 0:
    1.  Play a subtle notification sound (using `expo-av`).
    2.  Trigger a haptic vibration (using `expo-haptics`).
    3.  Increment the local `gtfuCount` state by 1.
    4.  If the user is logged in, immediately update the `gtfuCount` in Firestore.
    5.  Return to the Home Screen.