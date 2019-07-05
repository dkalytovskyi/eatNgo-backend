function defaultError (err, res) {
  res.status(400).send(err.message);
}
  
async function queryWrapper (req, res, functionToBePerformed, functionToCallOnError = defaultError) {
  try {
    const data = await functionToBePerformed(req, res);
    res.json(data);
  }
  catch(err) {
    functionToCallOnError(err, res);
  }
}
  
module.exports = queryWrapper;