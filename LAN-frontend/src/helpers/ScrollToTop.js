import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Helper function to scroll to top.
// Used for navlinks to scroll to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [pathname])

  return null
}

export default ScrollToTop
