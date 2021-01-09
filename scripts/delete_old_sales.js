const { default: Axios } = require("axios");

Axios.get(`http://localhost:4000/sales`).then((res) => {
  for (sale of res.data) {
    let dateCreated = new Date(sale.createdAt);
    let dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - 30);

    if (dateCreated <= dateLimit) {
      Axios.delete(
        `http://localhost:4000/companies/${sale.company}/sales/${sale._id}`
      );
    }
  }
});
