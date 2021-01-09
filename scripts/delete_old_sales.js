const { default: Axios } = require("axios");

Axios.get(`https://shopple.herokuapp.com/sales`).then((res) => {
  for (sale of res.data) {
    let dateCreated = new Date(sale.createdAt);
    let dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - 30);

    if (dateCreated <= dateLimit) {
      Axios.delete(
        `https://shopple.herokuapp.com/companies/${sale.company}/sales/${sale._id}`
      );
    }
  }
});
