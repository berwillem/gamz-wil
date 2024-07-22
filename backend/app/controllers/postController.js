const Archive = require("../models/Archive");
const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      category,
      subcategories,
      images,
      wilaya,
      commune,
      num,
      etat,
      date,
      author,
    } = req.body;

    const post = new Post({
      title,
      price,
      description,
      category,
      subcategories,
      images,
      wilaya,
      commune,
      etat,
      date,
      num,
      author,
    });

    const savedPost = await post.save();

    // Add the reference to the post to the user's posts field
    const user = await User.findById(author);
    user.posts.push(savedPost._id);
    await user.save();

    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log(err);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(req.query);

    const deletedPost = await Post.findById(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const archive = new Archive({
      title: deletedPost.title,
      reason: req.query.reason,
    });

    const document = await archive.save();
    console.log(document);
    await deletedPost.deleteOne();

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getMonthlyArchiveCounts = async (req, res) => {
  try {
    const archiveCounts = await Archive.aggregate([
      {
        // Extract year and month from the createdAt field
        $project: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          reason: 1,
        },
      },
      {
        // Group by year, month, and reason and count the number of archives
        $group: {
          _id: { year: "$year", month: "$month", reason: "$reason" },
          count: { $sum: 1 },
        },
      },
      {
        // Group by year and month and accumulate counts for each reason
        $group: {
          _id: { year: "$_id.year", month: "$_id.month" },
          sold_in: {
            $sum: {
              $cond: [{ $eq: ["$_id.reason", "sold_in"] }, "$count", 0],
            },
          },
          sold_out: {
            $sum: {
              $cond: [{ $eq: ["$_id.reason", "sold_out"] }, "$count", 0],
            },
          },
          other: {
            $sum: {
              $cond: [{ $eq: ["$_id.reason", "other"] }, "$count", 0],
            },
          },
        },
      },
      {
        // Sort by year and month
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        // Project the final output format
        $project: {
          _id: 0,
          sold_in: 1,
          sold_out: 1,
          other: 1,
        },
      },
    ]);

    res.status(200).json(archiveCounts);
    // res.status(200).json(await Archive.find({}))
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updates = req.body;
    const options = { new: true };
    const updatedPost = await Post.findByIdAndUpdate(postId, updates, options);
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate("author", "username avatar")
      .populate("category", "name");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 12;
    const userId = req.query.userId;
    const searchTerm = req.query.searchTerm;
    const searchRegex = new RegExp(searchTerm, "i");
    let query = {};

    if (userId) {
      query.user = userId;
    }

    if (searchTerm) {
      query.$or = [
        { title: searchRegex },
        // { category: searchRegex },
        // { subcategory: searchRegex },
      ];
    }

    const nbrposts = await Post.countDocuments(query);
    const nbrPage = Math.ceil(nbrposts / pageSize);

    const posts = await Post.find(query)
      .sort({ date: -1 })
      .populate("category", "name")
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({ posts, nbrPage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostCount = async (req, res) => {
  try {
    const count = await Post.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve post count" });
  }
};
exports.getPostsByCategoryId = async (req, res) => {
  try {
    
    const categoryId = req.params.categoryId;
    const page = req.query.page || 1;
    const pageSize = 12;
    const searchTerm = req.query.searchTerm;
    const searchRegex = new RegExp(searchTerm, "i");
    let query = {category: categoryId};

    

    if (searchTerm) {
      query.$or = [
        { title: searchRegex },
        // { category: searchRegex },
        // { subcategory: searchRegex },
      ];
    }
    const nbrposts = await Post.countDocuments(query);
    const nbrPage = Math.ceil(nbrposts / pageSize);

    const posts = await Post.find({ category: categoryId })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.json({ posts, nbrPage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostsBySubcategory = async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const page = req.query.page || 1;
    const pageSize = 12;
    const nbrposts = await Post.countDocuments({
      subcategories: subcategoryId,
    });
    const nbrPage = Math.ceil(nbrposts / pageSize);

    const posts = await Post.find({
      subcategories: subcategoryId,
    })
      .populate("author", "username avatar")
      .populate("category", "name")
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.json({ posts, nbrPage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostsCountByCategory = async (req, res) => {
  try {
    const counts = await Post.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: 0,
          categoryId: "$category._id",
          categoryName: "$category.name",
          count: 1,
        },
      },
    ]);

    res.status(200).json(counts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
