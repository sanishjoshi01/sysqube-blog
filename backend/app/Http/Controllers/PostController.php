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

    // public function create(){

    // }
}
