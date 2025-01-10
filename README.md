# Penta Clima

Penta Clima is a React-based web application that provides a 5-day weather forecast with updates every 3 hours. The application leverages the OpenWeatherMap API to deliver accurate and detailed weather data for any location worldwide.

## Features
- **5-Day Weather Forecast:** Displays weather conditions for the next 5 days in 3-hour intervals.
- **Search Functionality:** Search by city name or zip code.
- **Toggle Temperature Units:** Easily switch between Celsius and Fahrenheit.
- **Day-Wise View:** View detailed weather forecasts for individual days.

## Live Demo
Access the deployed app at: [Penta Clima](https://penta-clima-v5.netlify.app/)

## Installation

To run the project locally, follow these steps:

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/penta-clima.git
   cd penta-clima
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your OpenWeatherMap API key:
   ```env
   VITE_API_KEY=your_openweathermap_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to see the app.

## Project Structure
```
Penta-Clima/
├── public/
├── src/
│   ├── assets/           # Static assets (e.g., styles, images)
│   ├── components/       # Reusable components (e.g., Nav, WeatherCard, SearchBar)
│   ├── pages/            # Page components (e.g., Home, About, Forecast)
│   ├── services/         # API integration logic
│   ├── App.css           # Global styles
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Entry point
├── .env                  # Environment variables
├── package.json          # Project metadata and dependencies
└── vite.config.js        # Vite configuration
```

## API Integration
This app uses the OpenWeatherMap API to fetch weather data. Below are the primary endpoints:
- **City-based search:** `https://api.openweathermap.org/geo/1.0/direct`
- **Zip code-based search:** `https://api.openweathermap.org/geo/1.0/zip`
- **Weather forecast:** `https://api.openweathermap.org/data/2.5/forecast`

## Deployment
The app is deployed using Netlify. To deploy your own version:

1. Build the project:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Drag and drop the `dist/` folder into Netlify or deploy via CLI.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License.

---

### Acknowledgments
- [OpenWeatherMap API](https://openweathermap.org/api)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Netlify](https://www.netlify.com/)
