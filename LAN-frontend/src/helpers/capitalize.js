// Helper function to capitalize every word in a string
const capitalize = str =>
  str
    ?.split(' ')
    ?.map(subStr => subStr.charAt(0).toUpperCase() + subStr.slice(1))
    ?.join(' ')

export default capitalize
