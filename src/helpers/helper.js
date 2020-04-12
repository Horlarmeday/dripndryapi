// eslint-disable-next-line import/prefer-default-export
export function paginate(page, pageSize) {
  const offset = page * pageSize;
  const limit = pageSize;

  return {
    offset,
    limit,
  };
}
