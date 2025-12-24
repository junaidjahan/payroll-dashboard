# Payroll Dashboard

A modern, responsive employee self-service payroll dashboard built with Vue 3, TypeScript, and Tailwind CSS. This application provides employees with easy access to their payslips, benefits, leave management, timesheet tracking, and organizational information.

🌐 **Live Demo**: [https://payroll-dashboard-nu.vercel.app](https://payroll-dashboard-nu.vercel.app)

## 🛠️ Tech Stack

- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **UI Components**: Reka UI (shadcn-vue)
- **Routing**: Vue Router 4
- **State Management**: Pinia
- **Testing**: Vitest
- **Package Manager**: pnpm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version `^20.19.0` or `>=22.12.0`
- **pnpm**: Latest version (install via `npm install -g pnpm` or `corepack enable`)
- **Docker** (optional): For containerized deployment

## 🚀 Getting Started

### Option 1: Setup Without Docker

#### 1. Clone the repository

```bash
git clone <repository-url>
cd payroll-dashboard
```

#### 2. Install dependencies

```bash
pnpm install
```

#### 3. Start the development server

```bash
pnpm dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

#### 4. Build for production

```bash
pnpm build
```

The production build will be in the `dist` directory.

#### 5. Preview production build

```bash
pnpm preview
```

### Option 2: Setup With Docker

#### 1. Build the Docker image

```bash
docker build -t payroll-dashboard .
```

#### 2. Run the container

```bash
docker run -p 8080:80 payroll-dashboard
```

The application will be available at `http://localhost:8080`.

#### Using Docker Compose (Recommended)

For easier management, use Docker Compose:

```bash
# Build and start the container
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop the container
docker-compose down
```

The application will be available at `http://localhost:8080`.

## 📁 Project Structure

```
payroll-dashboard/
├── public/
│   └── helper-files/          # Static JSON files (menuLinks, payslips, PDFs)
├── src/
│   ├── assets/                # Static assets (icons, styles)
│   ├── components/
│   │   ├── core/              # Core components (Icon, SideDrawer)
│   │   ├── icons/             # Icon components
│   │   ├── shared/            # Shared components
│   │   └── ui/                # UI component library
│   ├── composables/           # Vue composables
│   ├── router/                # Vue Router configuration
│   ├── views/                 # Page components
│   └── main.ts                # Application entry point
├── Dockerfile                  # Docker configuration
├── docker-compose.yml         # Docker Compose configuration
├── nginx.conf                 # Nginx configuration for production
└── vercel.json                 # Vercel deployment configuration
```

## ✨ Features

- **💰 My Payslips** - View and manage payslips with:
  - Multi-currency support
  - Salary evolution charts
  - PDF download and print functionality
  - Detailed payslip breakdowns
- **📊 Dashboard** - Overview and quick access to key information _(Coming Soon)_
- **👤 My Information** - Personal employee information _(Coming Soon)_
- **⏰ Timesheet** - Time entry and tracking _(Coming Soon)_
- **📅 Leaves** - Leave management and requests _(Coming Soon)_
- **🎁 Benefits** - Employee benefits overview _(Coming Soon)_
- **👥 My Team** - Team member information _(Coming Soon)_
- **📈 Organizational Chart** - Company hierarchy visualization _(Coming Soon)_
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **🎨 Modern UI** - Built with Tailwind CSS and shadcn-vue components

## 🧩 Key Components

### Icon System

Icons are organized as individual Vue components in `src/components/icons/`. Use them via the `Icon` component:

```vue
<Icon name="dashboard" class="w-4 h-4" />
```

### Data Loading

The application loads data from JSON files in the `public/helper-files/` directory:

- `menuLinks.json` - Navigation menu configuration
- `payslips.json` - Payslip data

These files are loaded at runtime via HTTP requests, allowing updates without rebuilding the application.

## 🧪 Testing

Tests are written using Vitest and Vue Test Utils:

```bash
# Run tests in watch mode
pnpm test:unit

# Run tests once
pnpm test:unit --run
```

## 📝 Code Quality

### Formatting

Code formatting is handled by Prettier:

```bash
pnpm format
```

## 🎨 Styling

The project uses Tailwind CSS 4 for styling. Custom colors and design tokens are defined in `src/assets/styles/main.css`.

## 🔧 Configuration

### Vite Configuration

Vite configuration can be customized in `vite.config.ts`.

Built with ❤️ using Vue 3 and modern web technologies.
