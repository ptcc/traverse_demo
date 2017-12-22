import { resolveURLS } from "./resolveURLS"

//example object with some urls we need to fetch and replace by their contents
const obj = {
  test1: "https://www.adidas.com",
  a: 1,
  links: {
    google: "http://www.google.com",
    microsoft: "https://www.microsoft.com/pt-pt/"
  },
  arr: ['cenas', "https://www.adidas.com"]
}

//resolveURLS returns a promise with a new object with the same structure as the original,
// but with urls replaced by the result of fetching them.
resolveURLS(obj)
  .then(console.log)
  .catch(console.warn)
