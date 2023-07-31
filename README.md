# CannonUI ReactState - State Management Library for React

CannonUI ReactState is a simple and lightweight state management library for React applications. It provides a flexible API for managing and updating your application's state, and it supports the use of middleware for extending its functionality.

## Features

- Simple and easy-to-use API for managing state in React applications.
- Built-in support for middleware to enhance and customize the state management process.
- Lightweight and efficient design, minimizing the impact on your application's performance.
- Seamless integration with React components using custom hooks.
- Support for undo/redo, caching, animation, and more with customizable middleware.

## Installation

```bash
npm install @cannonui/reactstate@latest
```

## Usage

### 1. Creating a Store

To start using CannonUI ReactState, you need to create a store that holds your application's state. The store is created using the `createStore` function, where you define your initial state and the reducer function to handle state updates.

```typescript
// store.js
import { createStore } from "@cannonui/reactstate";
import type { apiStore } from "@cannonui/reactstate";

interface Store {
  val: number;
  inc: () => void;
  dec: () => void;
  reset: () => void;
}

const store = createStore((set: apiStore<Store>["set"]) => ({
  val: 1,
  inc: () => set((state: Store) => ({ val: state.val + 1 })),
  dec: () => set((state: Store) => ({ val: state.val - 1 })),
  reset: () => set((state: Store) => ({ val: 0 })),
}));

export type { Store };
export default store;
```

### 2. Using the Store in Components

You can use the `useStore` hook to connect your React components to the state store and access the state and actions.

```jsx
// MyComponent.js
import React from "react";
import useStore from "./useStore"; // Import the useStore hook
import { Store } from "./store"; // Import the store type

const MyComponent = () => {
  const { val, inc, dec, reset } = useStore < Store > store; // Use the useStore hook with your store

  return (
    <div>
      <div>Value: {val}</div>
      <button onClick={inc}>Increment</button>
      <button onClick={dec}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default MyComponent;
```

### 3. Adding Middleware

You can enhance your state management with middleware to add custom functionality. Middleware can be used for animations, caching, undo/redo, and more.

```javascript
const loggingMiddleware = async (state: any) => {
  console.log("State before update:", state);
  return state; // Return the state as is without modification
};

export default loggingMiddleware;
```

To add middleware to your store, you can pass it as an array to the `createStore` function:

```javascript
// store.js
import { createStore } from "@cannonui/reactstate";
import loggingMiddleware from "./loggingMiddleware";

// ... (previous code)

const store = createStore(
  (set: apiStore<Store>["set"]) => ({
    // ... (initial state and actions)
  }),
  {
    middlewares: [loggingMiddleware], // Add your middleware here
  }
);

// ... (remaining code)
```

## Contributing

We welcome contributions to CannonUI ReactState! If you find a bug or have an idea for an enhancement, feel free to open an issue or submit a pull request. Please ensure to follow our code of conduct.

## License

CannonUI ReactState is open-source software licensed under the MIT License.

## Acknowledgments

Special thanks to all contributors and the React community for their support.
