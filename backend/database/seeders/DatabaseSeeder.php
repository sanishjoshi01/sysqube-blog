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

        Post::factory(10)->make()->each(function ($post) use ($users) {
            $post->user_id = $users->random()->id;
            $post->save();
        });
    }
}
