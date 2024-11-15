const express = require("express");
const createError = require("http-errors");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const reviewRouter = express.Router();

// CREATE REVIEW - Only clients can create reviews
reviewRouter.post("/", verifyToken, async (req, res, next) => {
    try {
        const { id: userId, role } = req.user;

        // Only allow clients to create reviews
        if (role !== "client") {
            return res.status(403).json({ error: "Only clients can create reviews" });
        }

        const { photographerId, rating, comment } = req.body;

        const newReview = await prisma.review.create({
            data: {
                photographerId,
                userId,
                rating,
                comment,
            },
        });

        res.status(201).json(newReview);
    } catch (err) {
        console.error("Prisma error:", err);
        next(createError(500, "Error creating review"));
    }
});

// UPDATE REVIEW - Only the user who created the review can update it
reviewRouter.put("/:id", verifyToken, verifyTokenAndAuthorization, async (req, res, next) => {
    try {
        const { rating, comment } = req.body;

        const updatedReview = await prisma.review.update({
            where: { id: req.params.id },
            data: { rating, comment },
        });

        if (!updatedReview) {
            return next(createError(404, "Review not found"));
        }

        res.status(200).json(updatedReview);
    } catch (err) {
        console.error("Error updating review:", err);
        next(createError(500, "Error updating review"));
    }
});

// DELETE REVIEW - Only the user who created the review or an admin can delete it
reviewRouter.delete("/:id", verifyToken, verifyTokenAndAuthorization, async (req, res, next) => {
    try {
        const deletedReview = await prisma.review.delete({
            where: { id: req.params.id },
        });

        if (!deletedReview) {
            return next(createError(404, "Review not found"));
        }

        res.status(200).json("Review has been deleted");
    } catch (err) {
        console.error("Error deleting review:", err);
        next(createError(500, "Error deleting review"));
    }
});

// GET SINGLE REVIEW
reviewRouter.get("/:id", verifyToken, async (req, res, next) => {
    try {
        const review = await prisma.review.findUnique({
            where: { id: req.params.id },
            include: {
                photographer: true,
                user: true,
            },
        });

        if (!review) {
            return next(createError(404, "Review not found"));
        }

        res.status(200).json(review);
    } catch (err) {
        console.error("Error retrieving review:", err);
        next(createError(500, "Error retrieving review"));
    }
});

// GET ALL REVIEWS - Admin access
reviewRouter.get("/", verifyToken, verifyTokenAndAdmin, async (req, res, next) => {
    try {
        const reviews = await prisma.review.findMany({
            include: {
                photographer: true,
                user: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json(reviews);
    } catch (err) {
        console.error("Error retrieving reviews:", err);
        next(createError(500, "Error retrieving reviews"));
    }
});

module.exports = reviewRouter;
