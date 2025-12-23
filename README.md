# CN_SemProject
This project is a web-based simulation system developed to analyze and visualize energy-efficient routing in computer networks.
It allows users to simulate network topologies of different sizes and apply routing algorithms that consider distance, hop count, and energy consumption.

The application is designed as an interactive frontend-only web application, making it lightweight and suitable for academic demonstrations.
 Objectives:

Simulate network routing for multiple network sizes

Implement energy-aware routing algorithms

Visualize node placement, routing paths, and energy usage

Analyze and compare routing performance using real datasets

 Features:

Interactive network visualization

Energy-efficient routing simulation

Support for 50, 100, and 150 node networks

Real CSV-based energy datasets

Algorithm comparison and results analysis

Clean and user-friendly interface

Technologies Used:

React (with TypeScript)

Vite (Build Tool)

Tailwind CSS (Styling)

React Router DOM (Routing)

Lucide React (Icons)

CSV Files (Energy Data)
 Routing Algorithms:

The routing algorithms are implemented in:

src/utils/algorithms.ts


They compute routes based on:

Minimum distance

Minimum hop count

Energy-efficient node selection

Each simulation calculates:

Path taken

Total distance

Number of hops

Energy consumption
