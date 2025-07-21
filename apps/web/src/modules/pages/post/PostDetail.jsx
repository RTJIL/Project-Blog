import styles from './PostDetail.module.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function PostDetail({ baseUrl }) {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')

  const params = useParams()

  useEffect(() => {
    fetch(`${baseUrl}/api.odin.blog/v1/posts/${params.postId}`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Bearer')}`,
      },
    })
      .then((res) => res.json())
      .then((post) => setPost(post))
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false))
  }, [baseUrl, params.postId])

  console.log(post)

  const postComment = (formData) => {
    const comment = formData.get('comment')

    setComment('')

    console.log('Posting comment:', comment)
  }

  return loading ? (
    <div className="loaderContainer">
      <div className="loader"></div>
    </div>
  ) : (
    <main className={styles.postMain}>
      <div className={styles.contentContainer}>
        <img src={post.cover_url} alt="cover" className={styles.cover} />
        <h1>{post?.title}</h1>
        <div className={styles.tagsContainer}>
          <span className="tag date">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
        <p>{post?.content}</p>
        <div className={styles.commentForm}>
          <form action={postComment} className={styles.form}>
            <label htmlFor="comment"></label>
            <input
              type="text"
              id="comment"
              name="comment"
              placeholder="Leave a comment"
              autoComplete='off'
              value={comment}
              onChange={(e) => {
                setComment(e.target.value)
              }}
            />
            <button type="Submit">Send</button>
          </form>
        </div>
        <div className={styles.comments}>
          <h2>Comments:</h2>
          <div className={styles.comment}>
            
          </div>
        </div>
      </div>
    </main>
  )
}
