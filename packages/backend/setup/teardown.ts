module.exports = async function() {
  await global['__MONGO_CON__'].close();
  await global['__MONGOD__'].stop();
};