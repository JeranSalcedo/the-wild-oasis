# The Wild Oasis

Hotel management application built with React, Supabase, React Query, and styled-components. Features a dashboard displaying statistics powered by Recharts and data tables for managing bookings and cabins.

## Guest Account
Email: `test@test.com`
<br>Password: `testuser`

---

## Features

### Authentication

- User profile management
- Change password functionality
- Create user with email confirmation

### Dashboard

- Statistics for a given period of time
- Booking and revenue status
- Stay duration summary pie chart
- Sales area chart
- Pending arrivals and departures overview for the current day

### Cabin Management

- Create, edit, and delete cabins
- Update cabin image
- Table display of all cabins with filter and sort functionalities

### Booking Management

- Update status for unconfirmed and checked in bookings
- Table display of all bookings with filter, sort, and pagination functionalities
- Booking detail page
- Delete booking

### UI & UX

- Dark mode support

---

## Tech Stack

### Frontend

- React
- React Router
- React Query
- Styled Components
- Recharts

### Backend

- Supabase

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/JeranSalcedo/the-wild-oasis.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
```

### 4. Start the development server

```bash
npm run dev
```

---

## License

This project is for educational and portfolio purposes.
