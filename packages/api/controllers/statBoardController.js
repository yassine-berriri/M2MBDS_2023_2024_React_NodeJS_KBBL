const PxBoard = require('../models/pxBoardModel');
const User = require('../models/user');
const getStats = async (req, res) => {
    try {
        // Total number of users
        const totalUsers = await User.countDocuments({});

        // Total number of pixel boards
        const totalPxBoards = await PxBoard.countDocuments({});

        // Aggregate to calculate total filled pixels and total potential pixels
        const aggregateResults = await PxBoard.aggregate([
            { $unwind: "$pixels" },
            { $match: { "pixels.color": { $ne: null } } }, // Filter for filled pixels
            { $group: { _id: null, filledPixels: { $sum: 1 } } },
            { $addFields: { totalPxBoards: totalPxBoards } } // Include totalPxBoards for later calculations
        ]);

        // Calculate the total potential pixels
        const totalPotentialPixelsArray = await PxBoard.aggregate([
            { $group: { _id: null, totalPotentialPixels: { $sum: { $multiply: ["$size", "$size"] } } } }
        ]);

        const filledPixels = aggregateResults.length > 0 ? aggregateResults[0].filledPixels : 0;
        const totalPotentialPixels = totalPotentialPixelsArray.length > 0 ? totalPotentialPixelsArray[0].totalPotentialPixels : 0;
        const unfilledPixels = totalPotentialPixels - filledPixels;

        // Calculate the most popular color
        const mostPopularColor = await PxBoard.aggregate([
            { $unwind: "$pixels" },
            { $group: { _id: "$pixels.color", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);
        const popularColor = mostPopularColor[0] ? mostPopularColor[0]._id : 'None';

        res.json({
            totalUsers,
            totalPxBoards,
            filledPixels,
            unfilledPixels,
            mostPopularColor: popularColor
        });
    } catch (err) {
        res.status(500).send({ message: 'Error fetching stats', error: err });
    }
};

module.exports = { getStats };
