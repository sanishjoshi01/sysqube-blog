<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    //All Posts
    public function index()
    {
        return Post::with('user')->latest('published_at')->get();
    }

    //Post Detail
    public function show(Post $post)
    {
        $post->load('user');
        return response()->json($post);
    }

    //Dashboard
    public function dashboard()
    {
        $user = Auth::user();

        $posts = Post::with('user')
            ->where('user_id', $user->id)
            ->latest('published_at')
            ->get();

        return response()->json($posts);
    }

    //Creating Post
    public function create(Request $request)
    {
        $credentials = $request->validate([
            'title' => 'required|string|min:3|max:255',
            'slug' => 'required|string|min:3|max:255|unique:posts,slug',
            'excerpt' => 'required|string|min:3|max:255',
            'description' => 'required|string|min:10'
        ]);

        $user = Auth::user();

        if ($credentials) {
            Post::create([
                'user_id' => $user->id,
                'title' => $request->title,
                'slug' => $request->slug,
                'excerpt' => $request->excerpt,
                'description' => $request->description,
            ]);

            return response()->json([
                'message' => 'Post Created!'
            ]);
        }

        return response()->json([
            'message' => 'Something went wrong'
        ]);
    }


    //Deleting Post
    public function delete(Post $post)
    {
        if ($post->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully.'
        ]);
    }

    //Updating or Editing Post
    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'required|string|min:3|max:255',
            'slug' => 'required|string|min:3|max:255|unique:posts,slug,' . $post->id, //except this users 
            'excerpt' => 'required|string|min:3|max:255',
            'description' => 'required|string|min:10'
        ]);

        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post->update([
            'title' => $request->title,
            'slug' => $request->slug,
            'excerpt' => $request->excerpt,
            'description' => $request->description,
        ]);

        return response()->json(['message' => 'Post updated successfully', 'post' => $post]);
    }
}
