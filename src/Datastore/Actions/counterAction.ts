export let increment = (mult: number) => {
    return {
        type: 'INCREMENT',
        payload: mult
    }
}

export let decrement = () => {
    return {
        type: 'INCREMENT'
    }
}

export default increment;