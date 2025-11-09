# React Flow State Machine Controller

This project is a proof-of-concept application demonstrating how to build a state machine workflow editor using React, TypeScript, and the React Flow library.

It allows users to add, connect, and arrange nodes representing different states (Initial, Transition, Final). The entire flow, including node positions and connections, is automatically saved to the browser's `localStorage`, ensuring all progress is restored on page reload.

---

## ✨ Features

* **Custom Node Types:** Three distinct node types with specific connection rules:
    * **Initial:** Only allows outgoing connections (source handle).
    * **Transition:** Allows both incoming (target) and outgoing (source) connections.
    * **Final:** Only allows incoming connections (target handle).
* **Interactive UI:** Add nodes via the sidebar, drag them on the canvas, and create edges by dragging between handles.
* **Element Deletion:** Remove nodes and edges by selecting them and pressing `Delete` or `Backspace`.
* **Snap to Grid:** Nodes snap to a 16x16 pixel grid for easy alignment.
* **Data Persistence:** The complete state of the flow (including node positions and all edges) is automatically saved to `localStorage`.
* **State Visualization:** A live-updating sidebar shows the raw `JSON` data for both `nodes` and `edges`, displaying exactly what would be saved to a database.

## 🛠️ Tech Stack

* **React**
* **TypeScript**
* **React Flow** (The core library for the flow interface)
* **Vite** (Development environment and build tool)

## 🚀 Getting Started

Follow these steps to run the project locally.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repository.git](https://github.com/your-username/your-repository.git)
    cd your-repository
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *or*
    ```bash
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    *or*
    ```bash
    yarn dev
    ```

4.  **Open in your browser:**
    Navigate to `http://localhost:5173` (or the port indicated by Vite in your terminal).

## 🎮 How to Use

* **Add Nodes:** Use the buttons in the right-hand sidebar ("Add Initial State", etc.) to create new nodes on the canvas.
* **Move Nodes:** Click and drag a node to move it. It will snap to the grid.
* **Connect Nodes:** Click and drag from a handle (the circles) on one node to a handle on another node to create an edge (a connection).
* **Delete Nodes/Edges:** Click an element to select it, then press the `Delete` or `Backspace` key.
