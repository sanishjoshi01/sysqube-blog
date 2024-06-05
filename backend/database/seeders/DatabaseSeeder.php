<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $users = User::factory(2)->create([
            'password' => Hash::make('password'),
        ]);

        User::create([
            'id' => 3,
            'name' => 'san',
            'email' => 'san@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('sandesh'),
            'is_blocked' => false
        ]);

        Post::factory(10)->make()->each(function ($post) use ($users) {
            $post->user_id = $users->random()->id;
            $post->image = 'images/jCnTYWkniH1ZLLd4jBXMiSSbF5fhjDcgzB0QJput.png';
            $post->save();
        });
    }
}
