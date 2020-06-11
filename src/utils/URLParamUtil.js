export const getUrlParam = (url, param) => {
  let res = [];
  url
    .replace("?", "")
    .split("&")
    .forEach((v) => {
      let kv = v.split("=");

      if (kv[0] === param || decodeURIComponent(kv[0]) === param) {
        res.push(decodeURIComponent(kv[1]));
      }
    });

  if (res.length > 1) {
    return res;
  } else {
    return res[0];
  }
};
