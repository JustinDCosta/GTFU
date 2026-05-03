# GTFU: Architecture & Overview

## Concept
GTFU (Get The F*** Up) is a minimalist, modern productivity tool designed to break procrastination by lowering the activation energy required to start a task. 

## Tech Stack
*   **Framework:** Expo (React Native) for cross-platform compatibility (Web, Android, iOS).
*   **Backend:** Firebase (Authentication and Firestore).
*   **Navigation:** Expo Router.
*   **Styling:** NativeWind (Tailwind CSS for React Native) or standard StyleSheet for flat, modern design. Avoid glassmorphism; favor solid colors, clean typography, and sharp/slightly rounded corners.

## Core Mechanics
1.  **The Button:** A prominent button that initiates a 3-second timer (customizable, but defaults to 3s).
2.  **The Action:** When the timer hits 0, a subtle alarm/haptic feedback triggers, prompting the user to physically get up.
3.  **The Motivation:** The app displays rotating, hard-hitting discipline/time-management quotes.
4.  **The Tracking:** GTFU logs every successful timer completion under a "Times you GTFU" counter.
5.  **User State:** GTFU works offline/anonymously. Users can optionally create an account to sync their "Times you GTFU" count to the cloud.

## Database Schema (Firestore)
*   **Collection:** `users`
    *   `Document ID`: `uid` (from Firebase Auth)
    *   `email`: string
    *   `gtfuCount`: integer
    *   `createdAt`: timestamp
    *   `customTimerLength`: integer (default: 3)