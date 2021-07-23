require ('dotenv').config ();

const express = require ('express');
var cors = require ('cors');
const {v4: uuidv4, v4} = require ('uuid');

const stripe = require ('stripe') (process.env.STRIPE_SECRET_KEY);

const app = express ();
const port = process.env.PORT || 8000;

app.use (express.json ());
app.use (express.urlencoded ({extended: false}));
app.use (cors ());


app.post ('/payment', async (req, res) => {
    const {product, token} = req.body;

    await stripe.customers
    .create ({
        email: token.email,
    })
  .then (customer => {
      const body = {
        token:token,
        customer:customer,
        product:product
      }
      console.log(body)
      return res.status(200).json(body)
    })
  .catch (error => res.status(400).json({error:error}));

});

app.listen (port, () => console.log (`Listening on ${port}`));
