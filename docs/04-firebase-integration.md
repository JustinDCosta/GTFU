# GTFU: Firebase & State Management

## Setup Requirements
*   Create a `firebaseConfig.js` file in the root to initialize the Firebase project.
*   Export `auth` (from `firebase/auth`) and `db` (from `firebase/firestore`).

## State Management
*   Use React Context or a simple state manager like Zustand to hold the user's `gtfuCount` globally.
*   **Offline First:** GTFU should load the `gtfuCount` from `AsyncStorage` immediately upon opening so the user doesn't wait for a network request.
*   **Sync Logic:**
    *   If anonymous: Update `AsyncStorage`.
    *   If logged in: Update `AsyncStorage` AND push the new count to Firestore (`updateDoc` with `increment(1)`).
    *   On login: Fetch the `gtfuCount` from Firestore and overwrite the local `AsyncStorage` value.

## Security
*   Firestore Rules must ensure a user can only read and write to their own document based on `request.auth.uid`.