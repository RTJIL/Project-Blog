import { useState, useEffect, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './Layout.module.css'
import { IoSearch } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithub } from 'react-icons/fa'

export default function Layout({ user, logout }) {
  const [search, setSearch] = useState('')

  const [showPopup, setShowPopup] = useState(false)
  const popupRef = useRef(null)

  const [isOverflowed, setIsOverflowed] = useState(false)
  const nameRef = useRef()

  const navigate = useNavigate()

  const handleClickOutside = (e) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(e.target) &&
      !nameRef.current.contains(e.target)
    ) {
      setShowPopup(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const el = nameRef.current
    if (el && el.scrollWidth > el.clientWidth) {
      setIsOverflowed(true)
    }
  }, [user.username])

  const handleSearch = () => {
    const trimmed = search.trim()
    if (trimmed) {
      navigate(`/?search=${encodeURIComponent(trimmed)}`)
      setSearch('')
    }
  }
  return (
    <div className={styles.homeContainer}>
      <header>
        <Link to="/" className={styles.logo}>
          <img src="/logo.png" alt="logo" />
          <p>
            A<span className={styles.dev}>ved</span>I
          </p>
        </Link>

        <form action={handleSearch} className={styles.form}>
          <IoSearch className={styles.searchIco} />
          <label htmlFor="search-input"></label>
          <input
            id="search-input"
            type="search"
            name="search"
            autoComplete="off"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
        </form>
        <span
          ref={nameRef}
          onClick={() => setShowPopup((prev) => !prev)}
          className={`${styles.name} ${isOverflowed ? styles.overflowed : ''}`}
        >
          {user.username}
        </span>

        {showPopup && (
          <div ref={popupRef} className={styles.popup}>
            <button
              onClick={() => {
                logout()
              }}
            >
              Logout
            </button>
          </div>
        )}
      </header>

      <Outlet />

      <footer className={styles.footer}>
        <Link
          className={styles.socialLink}
          to="https://www.linkedin.com/in/artem-davydov-404442357/"
          target="_blank"
        >
          <FaLinkedin className={styles.linkedIn} />
        </Link>

        <Link
          className={styles.socialLink}
          to="https://github.com/RTJIL"
          target="_blank"
        >
          <FaGithub className={styles.github} />
        </Link>
      </footer>
    </div>
  )
}
