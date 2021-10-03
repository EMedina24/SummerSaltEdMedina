const path = require("path");
const fetch = require('node-fetch');

exports.createPages = ({  actions }) => {

  const { createPage } = actions;
  const PDPLayout = path.resolve(`src/templates/pdp.js`);
  const summerSaltFetch = fetch("https://summersalt.com/collections/swimwear/products.json?page=1&limit=50")
  .then((response) => response.json())
  .then((data) => {
    data.products.forEach((edge) => {
        createPage({
          path: `/product/${edge.title}`,
          component: PDPLayout,
          context: {
           id: edge.id,
           title:edge.title,
           image: edge.images[0].src,
           price:edge.variants[0].price

          },
        });
      });
  });
  return Promise.all([summerSaltFetch]);
};
