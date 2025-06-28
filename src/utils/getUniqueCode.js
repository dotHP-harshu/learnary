function getUniqueCode(content) {
  var string = content + Math.random().toString(16).slice(2);

  return string;
}

export default getUniqueCode;
