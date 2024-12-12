
# Enfin Technologies Machine Test 
## Time Slot Availability Checking Platform

This project is a machine test provided by **Enfin Technologies**. The task is to build a **time slot availability checking platform** with options to select multiple participants, specify a date range, and display their available time slots within the selected period. The participant details are stored in **Redis**.


## Features

### Pages

1. **Landing Page**
   - Two buttons:
     - **Add/Remove Participant Data**: Allows adding and removing participant data in Redis.
     - **Check Availability**: Navigates to `/participant/availability` to check available time slots.

2. **Availability Checking Page**
   - Users can:
     - Select multiple participants.
     - Specify a start and end date.
     - View available time slots for the selected participants within the specified period.

## Technologies Used
- **Frontend Framework**: Next.js
- **Programming Language**: TypeScript
- **Database**: Redis (local and Redis Cloud)
- **Styling**: Tailwind CSS
- **Additional Library**: Antd Design (for a stylish date picker)

## Environment Variables
Ensure the following environment variables are set in your `.env` file:

```env
# Redis connection URL for Redis Cloud (Free Tier with query limits)
NEXT_REDIS_CONNECTION_URL=redis://default:Evv8P7O4rAMtIzr4z3NkhsXJgf6lOAjk@redis-10287.c239.us-east-1-2.ec2.redns.redis-cloud.com:10287

# Local Redis connection URL (requires Redis setup locally)
NEXT_REDIS_CONNECTION_URL=redis://localhost:6379
```
### Note:
- Use the Redis Cloud link for convenience, but be aware of query limitations, I prefer to use local redis
- For the local Redis connection, ensure Redis is set up and running locally.
    ## Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Or build and start the production server:
   ```bash
   npm run build
   npm run start
   ```
## Challenges Faced
- **Redis Setup**:
  - Setting up Redis for frontend was new and required additional learning.
  - Connection setup and queries in the frontend took more time compared to backend Redis implementations.
- **Learning Curve**:
  - Gained valuable experience working with Redis in a Next.js project.
## Conclusion
This machine test was a wonderful learning experience. It provided an opportunity to:
- Learn new concepts and technologies.
- Improve my understanding of Redis integration in frontend development.
- Maintain a structured folder structure and create reusable components.
---
Thank you for reviewing this project!