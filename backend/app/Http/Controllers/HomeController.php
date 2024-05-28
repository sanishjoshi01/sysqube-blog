<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function home()
    {
        $text = "Text Updated in Controller";
        return response()->json($text);
    }
}
