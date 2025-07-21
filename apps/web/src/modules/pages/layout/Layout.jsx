import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.css'
import { IoSearch } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { FaLinkedin } from 'react-icons/fa'

export default function Layout() {
  const [search, setSearch] = useState('')
  const handleSearch = () => {}

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
        <span className={styles.name}>your name</span>
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
      </footer>
    </div>
  )
}
