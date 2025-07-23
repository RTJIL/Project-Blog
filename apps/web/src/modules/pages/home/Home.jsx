import { useState, useEffect } from 'react'
import styles from './Home.module.css'
import { Link, useSearchParams } from 'react-router-dom'
import { buildApiUrl } from '/src/utils/api.js'

export default function Home({ baseUrl }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchParams] = useSearchParams()
  const queryString = searchParams.toString()

  console.log('Query: ', queryString, 'search param', searchParams)

  useEffect(() => {
    fetch(
      buildApiUrl(
        `/api.odin.blog/v1/posts/${queryString ? `search?${queryString}` : ''}`,
        baseUrl
      ),
      {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('Bearer')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((posts) => {
        console.log(posts)
        return setPosts(posts)
      })
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false))
  }, [baseUrl, queryString])

  return loading ? (
    <div className="loaderContainer">
      <div className="loader"></div>
    </div>
  ) : (
    <main className={styles.homeMain}>
      {posts.map((post) => (
        <Link
          key={post.id}
          to={`/posts/${post.id}`}
          className={styles.articleLink}
        >
          <article className={styles.article}>
            <img src="/anonymous.png" alt="avatar" className={styles.avatar} />
            <h2>{post.title}</h2>
            <div className={styles.tags}>
              {posts.map((post) =>
                post.tags.map((tag) => (
                  <span className="tag" key={tag.name}>
                    #{tag.name}
                  </span>
                ))
              )}
            </div>

            <p>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: '2-digit',
              })}
              • {post.read_time} read time
            </p>
            <img
              src={post.cover_url}
              alt="preview"
              className={styles.preview}
            />
          </article>
        </Link>
      ))}
    </main>
  )
}
