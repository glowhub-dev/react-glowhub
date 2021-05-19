export const getAccountConfig = async (clientID) => {
  if (clientID) {
    const res = await fetch('https://api.glowhub.dev/accounts/getinfo/' + clientID)
    const responseJSON = await res.json()
    return responseJSON
  }
}