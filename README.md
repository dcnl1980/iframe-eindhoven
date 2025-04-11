# Eindhoven Map Explorer

An interactive Next.js 14 application that displays an OpenStreetMap with markers for locations in Eindhoven.

## Features

- Interactive map showing points of interest in Eindhoven
- Filterable locations by category and search terms
- Modern UI built with Shadcn UI components
- Responsive design that works on all devices
- Real-time search and filtering

## Technology Stack

- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Component library for consistent UI
- **React-Leaflet**: React components for Leaflet maps
- **OpenStreetMap**: Free and open-source map tiles

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm 9.6.7 or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/iframe-safari.git
   cd iframe-safari
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Deployment

You can also run the application using Docker:

1. Build the Docker image:
   ```bash
   docker build -t iframe-safari .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 iframe-safari
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Running the Embedded Server

To run the server specifically for serving the embedded.html file on port 8001:

1. For development mode:
   ```bash
   npm run dev:embedded
   ```

2. For production mode:
   ```bash
   npm run build
   npm run start:embedded
   ```

For testing purposes:

The embedded version will be available at [http://localhost:8001](http://localhost:8001) and will automatically serve the embedded.html file. This will render the complete code without the iframe. For iframe testing, the best is to setup a local Apache/Nginx server which points to the embedded.html file. 

## API Endpoints

### GET /api/markers

Returns a list of markers based on the provided filters.

Query parameters:
- `category`: Filter by location category (e.g., museum, park, cultural)
- `search`: Search term to filter locations by name or description

Example:
```
GET /api/markers?category=museum&search=philips
```

## Project Structure

```
├── public/               # Static files
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API endpoints
│   │   │   └── markers/  # Markers API
│   │   └── map/          # Map page
│   ├── components/       # React components
│   │   ├── ui/           # Shadcn UI components
│   │   ├── Map.tsx       # Map component
│   │   └── FilterPanel.tsx # Filter panel component
│   └── lib/              # Utility functions
└── README.md             # Project documentation
```

## Resources

- [OpenStreetMap](https://www.openstreetmap.org/) for providing free map data
- [Leaflet](https://leafletjs.com/) for the map library
- [Shadcn UI](https://ui.shadcn.com/) for the component library
- [Next.js](https://nextjs.org/) for the React framework
