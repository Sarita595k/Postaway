export const comments = []

// to get all the comments 
export const getAllComments = (data) => {
    const filterComment = comments.filter(comment => comment.postId == data.id)
    return filterComment
}

// to create comment
export const createComment = (data) => {
    const id = comments.length > 0 ? Math.max(...comments.map(comment => comment.id)) + 1 : 1
    const newComment = { id, ...data }
    comments.push(newComment)
    return newComment
}

// check is comment exist or not
export const commentExist = (data) => {
    return comments.find(comment => comment.id == data.id)
}

// to update a comment 
export const updateComment = (data) => {
    const index = comments.findIndex(comment => comment.id == data.id)
    if (index == -1) {
        return null
    }
    comments[index] = { ...comments[index], ...data }
    return comments[index]
}

// to delete comment
export const deleteComment = (data) => {
    const index = comments.findIndex(comment => comment.id == data.id)
    if (index == -1) {
        return null
    }
    comments.splice(index, 1)
    return true
}

// pagination for comments