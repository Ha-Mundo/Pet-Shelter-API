# Pet Shelter API

A RESTful API built with Express.js and TypeScript to manage pet shelter inventory. It features endpoints for browsing available pets, applying filters, and retrieving detailed information for each animal.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Query Parameters](#query-parameters)
- [Project Structure](#project-structure)

## ✨ Features

- **List Pets**: View all pets currently in the shelter  
- **Advanced Filtering**: Filter pets by:  
  - Species (e.g., Dog, Cat, Rabbit)  
  - Adoption status  
  - Age range (minimum and maximum)  
- **Comprehensive Pet Details**: Access full details for each pet including:  
  - Basic info (name, species, breed, age)  
  - Medical history (vaccinations, weight, microchip ID)  
  - Dates of intake and adoption  
  - Photos  
- **ID Validation**: Ensures pet IDs are numeric for lookup requests  
- **Authentication**: Simple authorization required to view individual pet details  
- **CORS Enabled**: Supports Cross-Origin Resource Sharing for frontend apps  


## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Language**: TypeScript v5.9.3
- **Additional Libraries**:
  - CORS v2.8.5 - Enable cross-origin requests
- **Development**: TypeScript compiler, type definitions

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Steps

1. Clone the repository:
```bash
git clone https://github.com/Ha-Mundo/Pet-Shelter-API.git

cd Pet-Shelter-API
```

2. Install dependencies:
```bash
npm install
```

3. Build the TypeScript code:
```bash
npm run build
```

## 🚀 Usage

### Start the Server

```bash
npm start
```

The server will compile TypeScript and start listening on `http://localhost:8000`

### Development Workflow

1. Modify TypeScript files in the `src/` directory
2. Run `npm run build` to compile
3. Run the compiled JavaScript files

## 📡 API Endpoints

### GET /pets

Retrieve all pets in the shelter with optional filtering.

**Request:**
```
GET /pets?species=Dog&adopted=false&minAge=2&maxAge=5
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Bella",
    "species": "Dog",
    "breed": "Border Collie",
    "age": 3,
    "adopted": false,
    "intakeDate": "2024-06-15T00:00:00.000Z",
    "medicalRecord": {
      "vaccinations": ["Rabies", "Distemper", "Parvovirus"],
      "weightKg": 18.4,
      "microchipId": null
    },
    "photo": "bella-border-collie.jpg"
  }
]
```

### GET /pets/:id

Retrieve detailed information about a specific pet.

**Requirements:**
- `id` must be a numeric value
- `password` query parameter must equal `"please"` (authentication mechanism)

**Request:**
```
GET /pets/1?password=please
```

**Response:**
```json
{
  "id": 1,
  "name": "Bella",
  "species": "Dog",
  "breed": "Border Collie",
  "age": 3,
  "adopted": false,
  "intakeDate": "2024-06-15T00:00:00.000Z",
  "medicalRecord": {
    "vaccinations": ["Rabies", "Distemper", "Parvovirus"],
    "weightKg": 18.4,
    "microchipId": null
  },
  "photo": "bella-border-collie.jpg"
}
```

**Error Responses:**
- `400` - Invalid ID format (not numeric)
- `400` - Pet not found by ID
- `401` - Missing or incorrect password (must be "please")
- `404` - Endpoint not found

## 🔍 Query Parameters

### GET /pets

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `species` | string | Filter by animal species (case-insensitive) | `?species=Dog` |
| `adopted` | boolean | Filter by adoption status | `?adopted=true` |
| `minAge` | number | Filter pets with minimum age | `?minAge=2` |
| `maxAge` | number | Filter pets with maximum age | `?maxAge=5` |

**Example Queries:**
- `GET /pets` - Get all pets
- `GET /pets?species=cat` - Get all cats
- `GET /pets?adopted=false` - Get all available pets (not adopted)
- `GET /pets?minAge=3&maxAge=7` - Get all pets between 3 and 7 years old
- `GET /pets?species=Dog&adopted=false&minAge=2` - Combine multiple filters

### GET /pets/:id

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | number | Yes | Pet ID (must be numeric) |
| `password` | string | Yes | Authentication key (must be "please") |

## 📁 Project Structure

```
Pet-Shelter-API/
├── src/
│   ├── index.ts                 # Application entry point
│   ├── controllers/
│   │   └── pets.controllers.ts  # Business logic for pet endpoints
│   ├── routes/
│   │   └── pets.routes.ts       # Route definitions
│   ├── middleware/
│   │   └── pets.middleware.ts   # Custom middleware (validation, auth)
│   └── data/
│       └── pets.ts              # Pet data and type definitions
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

### File Descriptions

* **`src/index.ts`** – Entry point: Initializes Express, configures CORS, and starts the server.
* **`src/controllers/pets.controllers.ts`** – Business Logic: Implements `getPets()` (with filtering) and `getPetById()`.
* **`src/routes/pets.routes.ts`** – Routing: Maps endpoints to their respective controllers and middleware.
* **`src/middleware/pets.middleware.ts`** – Custom Middleware:
    * `validateNumericId`: Ensures pet IDs are valid numbers.
    * `pleaseAuth`: Basic authentication check for a "please" password in queries.
* **`src/data/pets.ts`** – Data Layer: Contains TypeScript interfaces, type definitions, and mock pet data.

## 🐱 Sample Data

The API comes with pre-loaded sample data including:
- Bella (Border Collie Dog)
- Milo (Siamese Cat - adopted)
- Thumper (Mini Lop Rabbit)
- Charlie (Labrador Retriever Dog - adopted)
- Luna (Maine Coon Cat)
- Oscar (Beagle Dog)
- And more...

---
## 💡 Pro Tips

* **Authentication:** Remember to include `?password=please` as a query parameter when accessing individual pet details.
* **Case Sensitivity:** Species filtering is case-insensitive (e.g., `dog` and `Dog` yield the same results).
* **Refined Searching:** You can combine multiple query parameters to narrow down your search results.
* **Error Handling:** The API uses standard HTTP status codes: `404` for missing resources and `400/401` for client-side or authorization errors.