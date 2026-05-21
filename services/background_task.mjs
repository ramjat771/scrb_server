import { postFacebookImage } from "../facebook/facebookImagePost.service.mjs";
import * as repo from "../repositories/socialMediaPost.repo.mjs";
import { postTweetWithImage } from "../ximg.mjs";
import { postTweet } from "../xsend.mjs";
export function startBackgroundTask() {
  setInterval(async () => {
    try {
      const now = new Date();
      const nextFiveSeconds =
        new Date(
          now.getTime() + 5000
        );
      // console.log(
      //   `⏰ Checking scheduled posts at ${now.toLocaleString()}`
      // );

      // 🔍 Find scheduled posts
      const posts =
        await repo.getPendingPostsRepo(
          now,
          nextFiveSeconds
        );

      if (!posts.length) {
        // console.log(
        //   "❌ No scheduled posts found"
        // );
        return;
      }

      // 🔁 Loop posts
      for (const post of posts) {
        console.log(
          "🚀 Scheduled post triggered"
        );
        
//         await postTweet({
//   text: post.text,
// });

 console.log({
          id: post.id,
          text: post.text,
          image: post.image,})
//twitter post with image
try{
await postTweetWithImage({
  text: post.text,
  image: post.image,
})
}catch(error){
  console.log("Twitter post error:",error)
}

//facebook post 

try{
await postFacebookImage({
  caption: post.text,
  imageUrl:post.image,
  
})
}catch(error){
console.log("Facebook post error:",error)
}



        console.log({
          id: post.id,
          text: post.text,
          image: post.image,
          url: post.url,
          description:
            post.description,
          scheduleTimeAndDate:
            post.scheduleTimeAndDate,
        });


        // ✅ Mark Processed
        await repo.markProcessedRepo(
          post.id
        );

        console.log(
          `✅ Completed: ${post.id}`
        );




      }
    } catch (error) {
      console.log(
        "❌ Background task error:",
        error
      );
    }
  }, 5000);
}