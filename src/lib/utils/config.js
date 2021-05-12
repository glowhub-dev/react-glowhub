const axios = require('axios');

const getAccountConfig = async (clientID) => {
  if (clientID) {
    const res = await axios.get('https://api.glowhub.dev/accounts/getinfo/' + clientID)
    return res.data
  }
}

module.exports = { getAccountConfig }