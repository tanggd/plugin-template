const typeOf = o => {
  return Object.prototype.toString.call(o).slice(8, -1).toLocaleLowerCase()
}

export default typeOf