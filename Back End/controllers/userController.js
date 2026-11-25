import User from '../models/User.js';

export async function registerUser(req, res) {
  try {
    const {
      fullName,
      email,
      password,
      role,
      universityId,
      department,
      academicYear,
      phone,
      jobTitle,
      isVerified,
    } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Full name, email, and password are required.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role: role || 'student',
      universityId,
      department,
      academicYear,
      phone,
      jobTitle,
      isVerified: Boolean(isVerified),
    });

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).json(userObj);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function verifyUserEmail(req, res) {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'Email and verification code are required.' });
    }

    if (String(code).trim() !== '1111') {
      return res.status(400).json({ message: 'Invalid verification code. Enter 1111 to verify.' });
    }

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { isVerified: true },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Account not found for this email.' });
    }

    return res.status(200).json({
      message: 'Email verified successfully.',
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      message: 'Login successful',
      user: userObj,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateUserProfile(req, res) {
  try {
    const updates = { ...req.body };
    if (!updates.password) {
      delete updates.password;
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
