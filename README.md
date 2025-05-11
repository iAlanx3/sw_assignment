# Software Assessment
A Next.js app for:
1. Validating UENs
2. Visualizing weather/location info.

-----------------------------

## Developers

To run in development mode (with hot reloading):

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
3. Start development server
   npm run dev

## End User
To build and run the app using Docker:
1. Build the Docker image:
   docker build -t sw_assessment:latest .
2. Run the container:
   docker run -p 3000:3000 uen-validator
The app will be available at http://localhost:3000