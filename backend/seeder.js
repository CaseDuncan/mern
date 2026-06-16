import mongoose from 'mongoose';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';
import colors from 'colors';
import 'dotenv/config';

connectDB();

const importData = async () => {
  try {
    // Prevent duplicate seeding
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();

    if (userCount > 0 || productCount > 0) {
      console.log('Database already seeded — skipping import'.yellow);
      process.exit();
    }

    const createUsers = await User.insertMany(users);

    const adminUser = createUsers[0]._id;

    const sampleProducts = products.map(product => ({
      ...product,
      user: adminUser,
    }));

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

importData();