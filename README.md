# b8zeek-react-state

### `About`

`B8zeek React State` is an open source library which uses `React` hooks for application's state managment. It is implementation of `useContext` and `useReducer` hooks.

### `Usage`

First of all, we need to create our store with `createStore` function which takes reducer and initial state. It returns an array with `StoreProvider`, `useStore` function and `useDispatch` function.

`counter-store.js`
```jsx
import { createStore } from 'b8zeek-react-state'

const counterReducer = (state, action) => {
    switch (action.type) {
        case 'increment': return { ...state, counter: state.counter + 1 }
        case 'decrement': return { ...state, counter: state.counter - 1 }
        default: return state
    }
}

const [CounterProvider, useCounterStore, useCounterDispatch] = createStore(counterReducer, { counter: 0 })
```

`StoreProvider` should be provided to the component whose children should have the access to `useCounterStore` and `useCounterDispatch` functions.

`App.js`
```jsx
import React from 'react'
import { CounterProvider } from 'counter-store.js'

import Counter from 'Counter'
import IncrementButton from 'IncrementButton'
import DecrementButton from 'DecrementButton'

function App = () =>
    <CounterProvider>
        <div>
            <Counter />
            <IncrementButton />
            <DecrementButton />
        </div>
    </CounterProvider>

export default App
```

Next step is to import store and extract necessary values in children who need those.

`Counter.js`
```javascript
import React from 'react'
import { useCounterStore } from 'counter-store.js'

function Counter = () => {
    const { counter } = useCounterStore()

    return <div>{counter}</div>
}

export default Counter
```

Final step is to connect dispatch function with children who need to interact with the store.

`IncrementButton.js`
```jsx
import React from 'react'
import { useCounterDispatch } from 'counter-store.js'

function IncrementButton = () => {
    const counterDispatch = useCounterDispatch()

    return <button onClick={() => counterDispatch({ type: 'increment' })}>Increment Counter</button>
}

export default IncrementButton
```

And, that's it, store setup is finished and ready to be used.
