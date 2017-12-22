import { Map, List, fromJS } from "immutable-ext"
import Task from "data.task"
import { get } from "./get"
import R from "ramda"

//isMap :: any => boolean
const isMap = x => x instanceof Map
//isList :: any => boolean
const isList = x => x instanceof List
//isUrl :: any => boolean
const isURL = x => typeof (x) === "string" && x.startsWith("http")

//getURLs:: a => Task a
const getURLs = (v, k) => R.cond([
  [R.either(isMap, isList), R.traverse(Task.of, getURLs)],
  [isURL, get],
  [R.T, Task.of],
])(v)

//taskToPromise:: Task a => Promise a
const taskToPromise = task => new Promise((resolve, reject) => task.fork(reject, resolve))
//method:: string => obj => function
const method = R.invoker(0)

// resolveURLS:: obj => Promise obj
export const resolveURLS = R.compose(
  taskToPromise,
  R.map(method("toJS")),
  getURLs,
  fromJS
)
