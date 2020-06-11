let baseUrl = 'http://106.75.55.108:8008'

function parseJSON(response) {
  return response.json()
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 500) {
    return response
  }
  const error = new Error(response.statusText);
  error.response = response
  throw error
}

function urlFormat(url, data) {
  let res = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&')
  return url + '?' + res
}

export default async function request(options = {}) {
  let { data, url } = options
  options = {...options}
  options.mode = 'cors'
  delete options.url
  
  if (data) {
    if (options.method.toLowerCase() === 'get') {
      url = urlFormat(url, data)
    } else {
      options.body = JSON.stringify({
        data
      })
      options.headers={
        'Content-Type':'application/json'
      }
    }
    delete options.data
  }

  try {
        const rawResp = await fetch(baseUrl + url, options, { credentials: 'include' })
        const checkedResp = await checkStatus(rawResp)
        return parseJSON(checkedResp)
  } catch(err) {
      return ({ err })
  }
}