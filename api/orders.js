const express = require("express");
const router = express.Router();

const { authenticate } = require("./auth");
const prisma = require("../prisma");

router.get("/", authenticate, async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { customerId: req.user.id },
      include: { items: true },
    });
    res.json(orders);
  } catch (e) {
    next(e);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  const { date, note, productIds } = req.body;
  try {
    const order = await prisma.order.create({
      data: { date, note, 
        customerId: req.user.id, 
        items: { connect: productIds.map(id => ({ id: parseInt(id) })),
      },
    },
    include: { items: true },
    });

    res.status(201).json(order);
  } catch (e) {
    next(e);
  }
});


router.get("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const order = await prisma.order.findUniqueOrThrow({
      where: { id: +id },
      include: { items: true },
    });

    if (order.customerId !== req.user.id) {
      throw { status: 403, message: "Forbidden." };
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get order' });
  }
});

module.exports = router;
