<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        return Post::with('user')->latest('published_at')->get();
    }

    public function show(Post $post)
    {
        $post->load('user');
        return response()->json($post);
    }

    public function dashboard()
    {
        $user = Auth::user();

        $posts = Post::with('user')
            ->where('user_id', $user->id)
            ->latest('published_at')
            ->get();

        return response()->json($posts);
    }

    public function create(Request $request)
    {
        $credentials = $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:posts,slug',
            'excerpt' => 'required|string',
            'description' => 'required|string'
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
}
