const users = []

export const userList = () => {
    return users
}

export const addUserInList = (data) => {
    const id = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1
    const newUser = { id, ...data }
    users.push(newUser)
    return newUser
}