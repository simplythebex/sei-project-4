// gets the token from local storage
export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('token')
}

// gets the payload
export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return false 
  const parts = token.split('.')
  if (parts.length < 3) return false 
  return JSON.parse(atob(parts[1]))
}

// check whether user is authenticated
export const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  console.log(now < payload.exp)
  return now < payload.exp
}