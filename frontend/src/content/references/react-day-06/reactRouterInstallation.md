# React Router Installation

- [Framework](https://reactrouter.com/start/modes#framework 'Not available with Framework')
- [Data](https://reactrouter.com/start/modes#data 'Not available with Data')
- [Declarative](https://reactrouter.com/start/modes#declarative 'Available with Declarative')

## Introduction

You can start with a React template from Vite and choose "React", otherwise bootstrap your application however you prefer.

```
npx create-vite@latest
```

Next install React Router from npm:

```
npm i react-router
```

Finally, render a `<BrowserRouter>` around your application:

```
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

---

Next: [Routing](https://reactrouter.com/start/declarative/routing)
