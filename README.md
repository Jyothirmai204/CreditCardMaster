# CardMaster React Frontend

This frontend is designed against the Spring Boot backend in the same repository.

## Run

1. Install Node.js 18+.
2. From `frontend/`, run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:5173`.

## Backend

The app calls the backend at `http://localhost:8082` by default.

## Modules Covered

- IAM login and token storage
- PAA customer, application, and document actions
- CAU score and decision actions
- CIAS card and account creation
- TAP transaction and hold actions
- BSP statement and payment actions

## Note

This UI is intentionally built as an operator dashboard around the backend modules already present in the codebase. It does not yet include advanced state management, validation summaries, or charts.
