<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;

class LoginController extends Controller
{
    protected $decayMinutes = 1;
    protected $maxAttempts = 3;

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email|max:255',
            'password' => 'required|min:7|max:255'
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if ($user && $user->is_blocked && !$this->hasBlockExpired($user)) {
            return response()->json([
                'message' => 'Your account is blocked due to multiple failed login attempts.'
            ], 403);
        }

        if ($this->hasTooManyLoginAttempts($request)) {
            if ($user) {
                $user->is_blocked = true;
                $user->blocked_at = now();
                $user->save();
            }

            return $this->sendLockoutResponse($request, $user);
        }

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            $this->clearLoginAttempts($request);

            $user->is_blocked = false;
            $user->blocked_at = null;
            $user->save();

            return response()->json([
                'message' => 'User logged in successfully.',
                'user' => $user,
                'token' => $token
            ], 200);
        }

        $this->incrementLoginAttempts($request);

        return response()->json([
            'message' => 'Invalid login credentials.'
        ], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'User logged out successfully.'
        ], 200);
    }

    protected function hasTooManyLoginAttempts(Request $request)
    {
        return RateLimiter::tooManyAttempts($this->throttleKey($request), $this->maxAttempts);
    }

    protected function incrementLoginAttempts(Request $request)
    {
        RateLimiter::hit($this->throttleKey($request), $this->decayMinutes * 60);
    }

    protected function clearLoginAttempts(Request $request)
    {
        RateLimiter::clear($this->throttleKey($request));
    }

    protected function throttleKey(Request $request)
    {
        return strtolower($request->input('email')) . '|' . $request->ip();
    }

    protected function sendLockoutResponse(Request $request, $user)
    {
        $seconds = RateLimiter::availableIn($this->throttleKey($request));
        return response()->json([
            'message' => 'Too many attempts. Try again in ' . $seconds . ' seconds.',
            'retry_after' => $seconds
        ], 429);
    }

    protected function hasBlockExpired($user)
    {
        return $user->blocked_at && now()->diffInMinutes($user->blocked_at) > $this->decayMinutes;
    }
}
