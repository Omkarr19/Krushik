import { supabase } from "../lib/supabase";
import { uploadFile } from "./imageService";

export const createOrUpdatePost = async (post) => {
    try {
        // Upload image or video if the file exists and is an object
        if (post.file && typeof post.file === 'object') {
            let isImage = post?.file?.type === 'image';
            let folderName = isImage ? 'postImages' : 'postVideos';
            let fileResult = await uploadFile(folderName, post?.file?.uri, isImage);

            if (fileResult.success) {
                post.file = fileResult.data;
            } else {
                return fileResult; // Return if file upload fails
            }
        }

        // Ensure post type is set, default to 'General' if not provided
        post.type = post.type || 'General';

        console.log("Post being inserted/updated:", post);

        // Insert or update post in Supabase
        const { data, error } = await supabase
            .from('posts')
            .upsert({
                file: post.file || null,
                body: post.body || null,
                userId: post.userId,
                type: post.type, // Explicitly include type
                created_at: post.created_at || new Date().toISOString(), // Ensure timestamp
            })
            .select()
            .single();

        if (error) {
            console.log('createOrUpdatePost error: ', error);
            return { success: false, msg: 'Could not create or update your post' };
        }

        return { success: true, data: data };
        
    } catch (error) {
        console.log('createOrUpdatePost error:', error);
        return { success: false, msg: 'Could not create or update your post' };
    }
};

export const fetchPosts = async (limit=10) => {
    try {
       const {data, error} = await supabase
       .from('posts')
       .select(`
        *,
        user: users (id,name,image)
        `)
       .order('created_at', {ascending : false})
       .limit(limit);

       if(error){
          console.log('fetchPosts error:', error);
          return { success: false, msg: 'Could not fetch the Posts' };
       }

       return {success : true, data : data};
        
    } catch (error) {
        console.log('fetchPosts error:', error);
        return { success: false, msg: 'Could not fetch the Posts' };
    }
};

export const createPostLike = async (postLike) => {
    try {

        const {data, error} = await supabase
        .from('postLikes')
        .insert(postLike)
        .select()
        .single();
      
       if(error){
          console.log('postLike error:', error);
          return { success: false, msg: 'Could not like the post' };
       }

       return {success : true, data : data};
        
    } catch (error) {
        console.log('postLike error:', error);
        return { success: false, msg: 'Could not like the post' };
    }
};

export const removePostLike = async (postId ,userId) => {
    try {

        const { error} = await supabase
        .from('postLikes')
        .delete()
        .eq('userId', userId)
        .eq('postId', postId)
      
       if(error){
          console.log('postLike error:', error);
          return { success: false, msg: 'Could not remove the post like' };
       }

       return {success : true, data : data};
        
    } catch (error) {
        console.log('postLike error:', error);
        return { success: false, msg: 'Could not remove the post like' };
    }
};
