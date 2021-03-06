export const checkAuth = () => {
  if(localStorage.getItem('token')) {
    return true
  }
  return false
}