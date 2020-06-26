export const storeState = (state, id = 'home') => {
    localStorage.setItem('state_util_' + id, JSON.stringify(state))
}

export const fetchState = (id = 'home') => {
    var data = localStorage.getItem('state_util_' + id) ?? '{}'
    localStorage.removeItem('state_util_' + id)
    return JSON.parse(data)
}