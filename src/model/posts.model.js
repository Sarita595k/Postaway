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