// Set engine info from request
export const setRecordInfo = (record) => {
  return {
    _id: record._id,
    from: record.from,
    engine: record.engine,
    date: record.date,
    duration: record.duration,
    status: record.status,
    price: record.price,
  };
};
