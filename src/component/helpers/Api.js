export { formatData, getListIdAndListObjById };

function formatData(response) {
  return response && response.items ? response.items : [];
}

const getListIdAndListObjById = (data = [], key = null) => {
  if (key === null) {
    return data.reduce(
      (result, item) => {
        return {
          id: result.id + 1,
          listId: result.listId.concat(result.id),
          listObjById: {
            ...result.listObjById,
            [result.id]: item,
          },
        };
      },
      { listId: [], listObjById: {}, id: 0 },
    );
  }
  return data.reduce(
    (result, item) => {
      return {
        listId: result.listId.concat(item[key]),
        listObjById: {
          ...result.listObjById,
          [item[key]]: item,
        },
      };
    },
    { listId: [], listObjById: {} },
  );
};
