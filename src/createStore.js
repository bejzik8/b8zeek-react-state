import React from 'react'

export function createStore(reducer, initialState) {
    const storeContext = React.createContext()
    const dispatchContext = React.createContext()

    const StoreProvider = ({ children }) => {
        const [store, dispatch] = React.useReducer(reducer, initialState)

        return React.createElement(
            dispatchContext.Provider,
            { value: dispatch },
            React.createElement(
                storeContext.Provider,
                { value: store },
                children
            )
        )
    }

    function useStore() {
        return React.useContext(storeContext)
    }

    function useDispatch() {
        return React.useContext(dispatchContext)
    }

    return [StoreProvider, useStore, useDispatch]
}