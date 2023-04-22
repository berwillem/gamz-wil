const Post = require("../models/Post");
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
      num,
      author,
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
    const post = await Post.findById(postId);
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
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const userId = req.query.userId; // assuming you pass the userId as a query parameter
    let posts;
    if (userId) {
      // if userId is specified, retrieve only posts made by that user
      posts = await Post.find({ user: userId });
    } else {
      // otherwise, retrieve all posts
      posts = await Post.find();
    }
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     phoneNumber: '',
//     price: '',
//     willaya: '',
//     selectedCategory: []
// });
