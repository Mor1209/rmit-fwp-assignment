export default catchAsync => (req, res, next) =>
  catchAsync(req, res, next).catch(next)
