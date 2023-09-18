const methodValidationMiddleware = (req, res, next) => {
  const metodo = req.method;

  if (
    metodo == "POST" ||
    metodo == "GET" ||
    metodo == "PUT" ||
    metodo == "DELETE"
  ) {
    next();
  } else {
    res.status(405).send("Método inválido");
  }
};

module.exports = methodValidationMiddleware;
