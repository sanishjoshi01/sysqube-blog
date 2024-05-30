<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->jobTitle();

        return [
            'user_id' => null,
            'title' => $title,
            'slug' => Str::slug($title, '-'),
            'image' => fake()->image(),
            'excerpt' =>  implode(fake()->paragraphs(2)),
            'description' => implode(fake()->paragraphs(6)),
        ];
    }
}
