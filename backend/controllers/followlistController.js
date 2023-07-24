import Follow from "../model/followModel.js";
import Profile from "../model/profileModel.js";

//View followers
export async function getFollowers(req, res, next) {
  try {
    const { profileId } = req.params;//req.body

// Find all follow documents where the followingProfileId matches the given profileId
    const followers = await Follow.find({ followingProfileId: profileId });

//Extract the followerProfileId from each follow document
    const followerIds = followers.map(follower => follower.followerProfileId);

// Find the corresponding profiles based on the followerIds   
    const followerProfiles = await Profile.find({ _id: { $in: followerIds } });
    
 // Return the found follower profiles as a JSON response   
    res.status(200).json({
      followers: followerProfiles,
    });
  } catch (error) {
    next(error);
  }
}

// Show following
export async function getFollowing(req, res, next) {
  try {
    const { profileId } = req.params;//req.body

// Find all follow documents where the followerProfileId matches the given profileId
    const following = await Follow.find({ followerProfileId: profileId });

// Extract the followingProfileId from each follow document
    const followingIds = following.map(follow => follow.followingProfileId);

// Find the corresponding profiles based on the followingIds
    const followingProfiles = await Profile.find({ _id: { $in: followingIds } });

// Return the following profiles found as a JSON response 
    res.status(200).json({
      following: followingProfiles,
    });
  } catch (error) {
    next(error);
  }
}
/*export { getFollowers,
      getFollowing };*/