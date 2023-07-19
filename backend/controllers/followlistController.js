import Follow from "../model/followModel.js";
import Profile from "../model/profileModel.js";


export async function getFollowers(req, res, next) {
  try {
    const { profileId } = req.params;//req.body
   
    const followers = await Follow.find({ followingProfileId: profileId });
    const followerIds = followers.map(follower => follower.followerProfileId);
    const followerProfiles = await Profile.find({ _id: { $in: followerIds } });
    res.status(200).json({
      followers: followerProfiles,
    });
  } catch (error) {
    next(error);
  }
}

export async function getFollowing(req, res, next) {
  try {
    const { profileId } = req.params;//req.body
    
    const following = await Follow.find({ followerProfileId: profileId });
    const followingIds = following.map(follow => follow.followingProfileId);
    const followingProfiles = await Profile.find({ _id: { $in: followingIds } });
    res.status(200).json({
      following: followingProfiles,
    });
  } catch (error) {
    next(error);
  }
}
/*export { getFollowers,
      getFollowing };*/