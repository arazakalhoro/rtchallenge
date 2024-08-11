<?php

namespace App\Enums;

enum TaskStatus
{
    /**
     * Pending status
     */
    const Pending = 0;

    /**
     * Completed status
     */
    const Completed = 1;

    /**
     * Get the status label.
     *
     * @param int $value
     * @return string
     */
    public static function getLabel(int $value): string
    {
        switch ($value) {
            case self::Pending:
                return 'Pending';
            case self::Completed:
                return 'Completed';
            default:
                return 'Unknown';
        }
    }

    /**
     * Get all possible status options.
     *
     * @return array
     */
    public static function getOptions(): array
    {
        return [
            self::Pending => 'Pending',
            self::Completed => 'Completed',
        ];
    }
}
