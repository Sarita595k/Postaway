export const posts = []
export const getPost = () => {
    return posts
}

export const createPost = (data) => {
    const id = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1
    const newPost = { id, ...data }
    posts.push(newPost)
    return newPost
}

export const checkPostExist = (data) => {
    try {
        const id = posts.find(post => post.id == data.id) || null
        return id
    } catch (err) {
        console.log(err, "no post found model")
    }
}

export const updatePost = (data) => {
    const index = posts.findIndex(post => post.id == data.id)
    console.log(index)
    if (index == -1) {
        return false
    }
    posts[index] = { ...posts[index], ...data }
    return posts[index]
}
// export const deletePost=(id)=>{
//     const index=
// }