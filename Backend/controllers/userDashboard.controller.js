import User from "../models/user.model.js";
import Trip from "../models/trip.model.js";

export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");

    const trips = await Trip.find({ user: userId }).sort({ createdAt: -1 });


    const totalTrips = trips.length;
    const totalSpent = trips.reduce((sum, t) => sum + (t.budget || 0), 0);
    const recentTrips = trips.slice(0, 3);
    const upcomingTrips = trips.filter((t) => t.days > 1); //sample

    res.status(200).json({
      success: true,
      profile: user,
      stats: {
        totalTrips,
        totalSpent,
        upcomingTrips: upcomingTrips.length,
      },
      recentTrips,
      allTrips: trips,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ success: false, message: "Error fetching dashboard data" });
  }
};



export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    if (req.file) updates.profileImage = `uploads/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password");

    if (!updatedUser)
      return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Error updating profile" });
  }
};


export const cancelUserTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const trip = await Trip.findOneAndDelete({ _id: id, user: userId });

    if (!trip)
      return res.status(404).json({ success: false, message: "Trip not found or unauthorized" });

    res.status(200).json({
      success: true,
      message: `Trip to ${trip.destination} canceled successfully`,
    });
  } catch (error) {
    console.error("Cancel trip error:", error);
    res.status(500).json({ success: false, message: "Error canceling trip" });
  }
};
