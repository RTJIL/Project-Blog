import styles from './PostDetail.module.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { buildApiUrl } from '/src/utils/api.js'

export default function PostDetail({ baseUrl, user }) {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [refreshComments, setRefreshComments] = useState(false)

  const params = useParams()

  useEffect(() => {
    setLoading(true)

    fetch(buildApiUrl(`api.odin.blog/v1/posts/${params.postId}`, baseUrl), {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('Bearer')}`,
      },
    })
      .then((res) => res.json())
      .then((post) => setPost(post))
      .catch((err) => console.error(err.message))

    fetch(buildApiUrl(`api.odin.blog/v1/comments/${params.postId}`, baseUrl), {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('Bearer')}`,
      },
    })
      .then((res) => res.json())
      .then((comments) => setComments(comments))
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false))
  }, [baseUrl, params.postId, refreshComments])

  console.log(post)

  const postComment = (formData) => {
    const comment = formData.get('comment')

    const createComment = async () => {
      const res = await fetch(
        buildApiUrl(`api.odin.blog/v1/comments`, baseUrl),
        {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('Bearer')}`,
          },
          body: JSON.stringify({
            message: comment,
            postId: params.postId,
            authorId: user.sub,
          }),
        }
      )

      if (!res.ok) throw new Error('Failed to post comment')
    }
    createComment()
    setComment('')
    setRefreshComments((prev) => !prev)
    console.log('Posting comment:', comment, 'From user: ', user)
  }

  /* if (loading || !post) {
    return (
      <div className="loaderContainer">
        <div className="loader"></div>
      </div>
    )
  } */

  return loading || !post ? (
    <div className="loaderContainer">
      <div className="loader"></div>
    </div>
  ) : (
    <main className={styles.postMain}>
      <div className={styles.contentContainer}>
        <img
          src={post?.cover_url || '/placeholder-cover.jpg'}
          alt="cover"
          className={styles.cover}
        />
        <h1>{post?.title}</h1>
        <div className={styles.tagsContainer}>
          <span className="tag date">
            {new Date(post?.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
          {post.tags?.map((tag) => (
            <span className="tag" key={tag.id}>
              #{tag.name}
            </span>
          ))}
        </div>

        <p>{post?.content}</p>

        <div className={styles.commentForm}>
          <form action={postComment} className={styles.form}>
            <label htmlFor="comment"></label>
            <textarea
              type="text"
              id="comment"
              name="comment"
              placeholder="Leave a comment"
              autoComplete="off"
              rows={3}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value)
              }}
            />
            <button type="Submit">Send</button>
          </form>
        </div>

        <h2 className={styles.title}>Comments:</h2>

        {comments.map((comment) => (
          <div className={styles.comments} key={comment.id}>
            <div className={styles.comment}>
              <div className={styles.commentHeader}>
                <h3>{comment.author.username}</h3>
                <div>
                  <span className="tag date">
                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: '2-digit',
                    })}
                  </span>
                </div>
              </div>
              <span className={styles.message}>{comment.message}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
