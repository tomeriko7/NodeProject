// Middleware for validating card data
export const validateCard = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));

    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors,
    });
  }

  next();
};
