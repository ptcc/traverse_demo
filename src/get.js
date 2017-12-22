import R from "ramda"
import axios from "axios"
import Task from "data.task"

//get:: string => Task Error|Html
export const get = url => new Task((rej, res) =>
  axios.get(url)
    .then(R.prop('data'))
    .then(str => str.substr(0,50))
    .then(res)
    .catch(err => res(`FAILED fetching ${url.toUpperCase()}`)))