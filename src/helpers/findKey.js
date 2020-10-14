const findKey = (name, obj) => {
  return Object.keys(obj).find(key => obj[key] === name);
}

export default findKey;