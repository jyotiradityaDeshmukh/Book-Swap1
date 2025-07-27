const express = require("express");
const mongo = require("mongoose");
const app = express();
const User = require("./model/user");
const Cart = require("./model/cart");
const cors = require("cors");
const Swap = require("./model/swaprequest");
const Checkout = require("./model/buyed");

mongo
  .connect(
    "mongodb+srv://prathameshgayake2021comp:KPw8inTRS3CeWXJm@bookswap.xmwvjfh.mongodb.net/?retryWrites=true&w=majority&appName=bookswap"
  )
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//login controller
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  await User.findOne({ email: email }).then((user) => {
    console.log(user);
    if (user) {
      if (user.password == password) {
        res.json("success");
        console.log("success");
      } else {
        res.json("password incorrect");
        console.log("password incorrect");
      }
    } else {
      res.json("Email id is not registered");
    }
  });
});

//register controller
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  await User.create({ email: email, password: password })
    .then(() => res.json("success"))
    .catch((e) => {
      res.json("error");
    });
  console.log(req.body);
});

//add_to_cart controller
app.post("/addcart", async (req, res) => {
  const { name, price, img, user } = req.body;

  console.log(user);
  await Cart.create({ email: user, name: name, Price: price, img: img }).then(
    () => {
      res.json("success");
    }
  );
});

//get_the_cart controller
app.get("/getcart", async (req, res) => {
  const { user } = req.query;
  const data = await Cart.find({ email: user });
  res.json(data);
});

//remove cart
app.post("/removecart", async (req, res) => {
  const { name, user } = req.body;

  console.log(user, name);
  await Cart.findOneAndDelete({ email: user, name: name }).then(() => {
    res.json("success");
  });
});

app.post("/checkout", async (req, res) => {
  const { user, name, img, price } = req.body;

  console.log(user);
  await Cart.deleteOne({
    email: user,
    name: name,
    Price: price,
    img: img,
  }).then(() => {
    console.log(user, name);
  });
  // await gatwway(res, price);
  await Checkout.create({
    email: user,
    name: name,
    Price: price,
    img: img,
  }).then(() => {
    res.json("success");
    console.log("buyed", user, name);
  });
});

app.get("/getbuyed", async (req, res) => {
  const { user } = req.query;
  const data = await Checkout.find({ email: user });
  res.json(data);
});

app.post("/generateswap", async (req, res) => {
  const { user, email2, swap_book } = req.body;

  const already_has_book = await Checkout.find({
    email: email2,
    name: swap_book,
  });

  console.log(already_has_book);

  if (already_has_book.length === 0) {
    console.log(user, email2, swap_book);
    await Swap.create({
      email1: user,
      email2: email2,
      book_name: swap_book,
    })
      .then(() => {
        res.json("success");
      })
      .catch((e) => res.json("already_sent"));
  } else {
    res.json("already");
  }
});

app.get("/getswapreq", async (req, res) => {
  const { user } = req.query;
  const data = await Swap.find({ email2: user });
  res.json(data);
});

app.get("/getuser", async (req, res) => {
  const data = await User.find();
  res.json(data);
});

app.post("/acceptswapfuc", async (req, res) => {
  const { user, email2, swap_book, swap_book2 } = req.body;

  console.log(user, email2, swap_book, swap_book2);
  await Swap.findOneAndDelete({
    email1: email2,
    email2: user,
    book_name: swap_book,
  }).catch((e) => console.log(e));
  let a = await Checkout.find({ email: email2, name: swap_book2 });
  if (a) {
    return res.json("already");
  }
  await Checkout.findOneAndUpdate(
    { email: user, name: swap_book2 },
    { $set: { email: email2 } }
  );
  await Checkout.findOneAndUpdate(
    { email: email2, name: swap_book },
    { $set: { email: user } }
  ).then((r) => res.json("success"));
});

//delete user,swapbook2
//delete email2,swap_book

app.listen(8003, () => console.log("hello"));
