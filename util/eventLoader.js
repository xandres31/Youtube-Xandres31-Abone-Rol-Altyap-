const reqEvent = (event) => require(`../events/${event}`);
module.exports = xandres => {
  xandres.on('ready', () => reqEvent('ready')(xandres));
  xandres.on('message', reqEvent('message'));
};