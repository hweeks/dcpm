let fetchResponses = {}
let fetchValues = {}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchFunc = async (url, options) => {
  fetchValues[url] = {
    url, options
  }
  await timeout(0)
  const hasValues = fetchResponses[url]
  return {
    ok: hasValues.ok || true,
    json() {
      return hasValues || options
    }
  }
}

const setResponse = (url, value) => {
  fetchResponses[url] = value
}

const getConfig = () => {
  return fetchValues
}

const clearAll = () => {
  fetchResponses = {}
  fetchValues = {}
}

module.exports = Object.assign(fetchFunc, {setResponse, getConfig, clearAll})
