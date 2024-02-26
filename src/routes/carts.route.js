import { Router } from "express";
import { CartManager } from "../daos/cartManager.js";
import { ProductManager } from "../daos/ProductManager.js";
import { authorization } from "../utils.js";


const router = Router();
const cartManager = new CartManager();

router.post('/:cid/purchase', async (req, res) => {
  const cartId = req.params.cid;
  console.log('/:cid/purchase - ', req.session.user.id)
  const user = req.session.user;

  try {
    const purchase = await cartManager.finishBuying(cartId, user);
    
    res.json({ success: true, message: 'Compra finalizada con éxito.', purchase});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'No se pudo completar la compra.', error: error.message });
  }
}), 

router.get("/", async (req, res) => {
    const carts = await cartManager.getCarts()

    try {
        res.json(carts);

    } catch (error) {
        console.error("Hubo un error al devolver los carritos", error);
        res.status(500).send("Hubo un error al devolver los carritos");
    }
})

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const products = await cartManager.getCartById(cid);
    res.json(products);
  } catch (error) {
    console.error("Hubo un error al devolver los carritos", error);
    res.status(500).send("Hubo un error al devolver los carritos");
  }
});

router.post("/", authorization('user'), async (req, res) => {
    try{
      console.log('carts.route  -' + JSON.stringify(req.body));
      const {productId, quantity} = req.body;
      if (!productId || !quantity) {
          console.log('carts.route  -' + JSON.stringify({productId, quantity}));
          return res.status(400).json({ error: "Faltan propiedades obligatorias del carrito." });
      }
      // Crear el objeto cart esperado con una estructura que incluya items
      const cartToBeAdded = {
          items: [
              {
                  productId,
                  quantity
              }
          ]
      };
      const cart = await cartManager.addCart(cartToBeAdded);
      console.log("carts.route - " + JSON.stringify(cart));
      res.json({ cart });
      return;
    } catch (error){
        console.log("carts.route - Hubo un error al agregar el carrito");
        res.status(500).send(`Hubo un error al agregar el carrito`)
    }
})

router.post('/cart/:cartId/product', async (req, res) => {
  const { cartId } = req.params;
  const { productId, quantity } = req.body;
  
  try {
      const result = await cartManager.addProductToCart(cartId, productId, quantity);
      res.status(200).send(result);
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
});

router.delete("/cart/:cartId/product/:productId", async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    await cartManager.deleteCartProduct(cartId, productId);

    res.status(200).send("Producto eliminado del carrito");
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

router.delete("/cart/:cartId", async (req, res) => {
    try {
      const { cartId } = req.params;
  
      await cartManager.deleteCart(cartId);
  
      res.status(200).send("Carrito eliminado");
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  });

export default router;
