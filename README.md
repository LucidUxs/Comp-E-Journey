# Comp-E-Journey

Welcome to **Comp-E-Journey**, a dynamic and responsive web application built with modern web technologies that showcases the Computer Engineering program and its various pillars, partners, and career opportunities.

## Tools Used

- **Node.js**: JavaScript runtime environment for executing JavaScript code server-side and building the frontend stack.
- **npm (Node Package Manager)**: Used for managing project dependencies and running build scripts.
- **Git & GitHub**: Version control system to track changes and collaborate on the codebase.
- **ESLint**: Linter used to maintain code quality, enforce coding standards, and catch potential errors early during development.

## Frameworks/Libraries Used

- **React (v19)**: A popular JavaScript library for building user interfaces utilizing a component-based architecture for reusability and maintainability.
- **Vite**: A fast, modern frontend build tool that provides a faster and leaner development experience for modern web projects.
- **Tailwind CSS (v4)**: A utility-first CSS framework used for rapid UI development, allowing for highly customizable, responsive, and modern designs directly within the markup.
- **React Router DOM**: The standard routing library for React, enabling client-side routing to create a seamless Single Page Application (SPA) experience without full page reloads.
- **React Icons**: A comprehensive Icon library providing easy access to popular icon packs as React components to enhance the visual appeal of the UI.

## Hosting Platform

- **Vercel**: A cloud hosting platform perfectly tailored for frontend frameworks and static sites. The application uses a custom `vercel.json` configuration to handle client-side routing properly by redirecting all incoming paths to the `index.html` file, ensuring React Router functions correctly in production.

## Brief Explanation of Design Decisions

- **Single Page Application (SPA) Architecture**: We chose React paired with React Router to build an SPA. This allows users to navigate smoothly between pages (such as Home, Partners, and Careers) ensuring a fluid, app-like experience without the lag of traditional page reloads.
- **Utility-First Styling**: Tailwind CSS was selected as the styling solution to drastically speed up the development process. Instead of managing separate stylesheets, utility classes are applied directly in the JSX, keeping the styling tightly coupled with the structure and making responsive design straightforward.
- **High-Fidelity, Immersive UI**: Built with modern user expectations in mind, the application features dynamic layouts, 3D-tilted perspective effects, smooth scroll-reveal animations, and responsive grids. This ensures a "wow" factor that adapts elegantly across both desktop and mobile viewports.
- **Component-Driven Development**: The UI is broken down into small, reusable components (like headers, dynamic cards, and custom buttons). This modular approach makes the codebase easier to read, test, and scale over time.
- **Performance Optimization**: By leveraging Vite as the bundler and optimizing static assets (like lazy loading specific visual elements and components), the application is designed to prioritize minimal load times and smooth rendering.
