// Set engine info from request
export const setRecordInfo = (record) => {
  return {
    _id: record._id,
    from: record.from,
    engine: record.engine,
    date: new Date(record.date).toLocaleString().slice(0, -3),
    duration: new Date(record.duration).toLocaleTimeString().slice(0, -3),
    status: record.status === 'Waiting' ? 'En attente' : record.status === 'Accept' ? 'Accepté' : 'Annulé',
    price: record.price,
  };
};
