# react-glowhub
![npm](https://img.shields.io/npm/v/react-glowhub)
![npm](https://img.shields.io/npm/dm/react-glowhub)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-glowhub)

react-glowhub is a react library for using GlowHub components in your react app. It is very simple to use and most of the configuration is done through glowhub.dev.

## Installing

Using npm
```js 
npm i react-glowhub
```

## Getting Started
Import GlowHubLoader from react-glowhub and add the GlowHubLoader to your app first.

```js
import { GlowHubLoader } from 'react-glowhub'

const App = () => {
  return (
    <div>
      <GlowHubLoader 
        clientID='GH-ER4JHWJNRV' 
      />

      <h1>Your content</h1>
    </div>
  );
};
```

The rest of the configuration can be done from glowhub.dev