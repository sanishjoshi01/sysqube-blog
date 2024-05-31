<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

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
}
