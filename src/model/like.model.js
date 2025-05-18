export const likes = []

export const getAllLikes = (data) => {
    const filterLike = likes.filter(like => like.postId == data.id)
    return filterLike
}
export const addLike = (data) => {
    const alreadyLiked = likes.find(like => like.userId == data.userId && like.postId == data.postId)
    if (alreadyLiked) {
        return null
    }
    const id = likes.length > 0 ? Math.max(...likes.map(like => like.id)) + 1 : 1
    const newLike = { id, ...data }
    likes.push(newLike)
    return newLike
}

export const deleteLike = (data) => {
    const index = likes.findIndex(like => like.id == data.id)
    if (index == -1) {
        return null
    }
    likes.splice(index, 1)
    return true
}