export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    req.validData = value; // Lưu dữ liệu hợp lệ vào req
    next();
  };
};
