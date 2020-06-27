const baseUrl = "http://106.75.55.108:8008";

async function parseJSON(response) {
  var data = await response.text()
  
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 500) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function urlFormat(url, data) {
  let res = Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
  return url + "?" + res;
}

function postFormat(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default async function request(options = {}) {
  let { data, url } = options;
  options = { ...options };
  options.mode = "cors";
  options.cache = 'no-cache'
  delete options.url;

  if (data) {
    if (options.method.toLowerCase() === "get") {
      url = urlFormat(url, data);
    } else {
      options.body = postFormat(data);
      options.headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
    }
    delete options.data;
  }

  try {
    const rawResp = await fetch(baseUrl + url, {...options, 'credentials': 'include'});
    const checkedResp = await checkStatus(rawResp)
    
    return parseJSON(checkedResp);
  } catch (err) {
    return { err };
  }
}
