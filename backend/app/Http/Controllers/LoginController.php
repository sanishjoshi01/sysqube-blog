<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $user = User::where('email', $credentials['email'])->first();

            if ($user && Hash::check($credentials['password'], $user->password)) {
                $user = Auth::user();
                $token = $user->createToken('auth_token')->plainTextToken;
                return response()->json([
                    'message' => 'User logged in successfully',
                    'user' => $user,
                    'token' => $token
                ], 200);
            }
        }

        return response()->json([
            'message' => 'Invalid login credentials'
        ], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'User logged out successfully'
        ], 200);
    }
}
