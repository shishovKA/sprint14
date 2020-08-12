/* eslint-disable no-useless-escape */
const validURL = (str) => {
  const pattern = new RegExp('(?:(?:http:)|(?:https:))\/\/(?:www\.)?(?:(?:(?:\d{1,3}\.){3}\d{1,3}(?::\d{2,5}))|(?:(?:(?:[A-Za-z0-9]+)|(?:(?:[A-Za-z0-9]+[-]{1})+[A-Za-z0-9]+))(?:\.(?:[\d]*[A-Za-z]+[\d]*)+)+(?::\d{2,5})*))(?:\/(?:[\d]*[A-Za-z]+[\d]*))*(?:(?:\/)|(?:#))?', 'i');
  return !!pattern.test(str);
};

module.exports = validURL;
