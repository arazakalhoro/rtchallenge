<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User;

class PasswordResetLink extends Notification
{
    use Queueable;

    public $user;
    public $reset_url;

    /**
     * Create a new notification instance.
     */
    public function __construct(User $user, $reset_url)
    {
        $this->user = $user;
        $this->reset_url = $reset_url;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Reset Password')
            ->greeting('Hello ' . $this->user->name)
            ->line('You are receiving this email because we received a password reset request for your account.')
            ->action('Reset Password', $this->reset_url)
            ->line('If you did not request a password reset, no further action is required.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
