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
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
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
    const page=req.query.page||1;
    const pageSize=12;
    const nbrposts = await Post.countDocuments();
    const nbrPage=Math.ceil(nbrposts/pageSize)
    const userId = req.query.userId;
    let posts;
    if (userId) {
      posts = await Post.find({ user: userId })
        .sort({ date: -1 })
        .populate("category", "name").skip((page-1)*pageSize).limit(12);
        
    } else {
      posts = await Post.find().sort({ date: -1 }).populate("category", "name").skip((page-1)*pageSize).limit(12);;
    }
    res.json({posts,nbrPage});
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
    const page=req.query.page||1;
    const pageSize=12;
    const nbrposts = await Post.countDocuments({ category: categoryId });
    const nbrPage=Math.ceil(nbrposts/pageSize)

    const posts = await Post.find({ category: categoryId }).skip((page-1)*pageSize).limit(pageSize);
    res.json({posts,nbrPage});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostsBySubcategory = async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const page=req.query.page||1;
    const pageSize=12;
    const nbrposts = await Post.countDocuments({subcategories: subcategoryId,});
    const nbrPage=Math.ceil(nbrposts/pageSize)
   
    const posts = await Post.find({
      subcategories: subcategoryId,
    })
      .populate("author", "username avatar")
      .populate("category", "name").skip((page-1)*pageSize).limit(pageSize);
    res.json({posts,nbrPage});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
