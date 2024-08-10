<?php

namespace Database\Factories;

use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(2),
            'due_date' => now()->addDays(rand(1, 30)),
            'user_id' => $this->faker->numberBetween(1, 10),
            'status' => $this->faker->randomElement([TaskStatus::Pending, TaskStatus::Completed]),
        ];
    }
}
