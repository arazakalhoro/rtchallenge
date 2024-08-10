<?php

namespace App\Models;

use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
class Task extends Model
{
    use HasFactory, SoftDeletes, HasFactory;

    protected $fillable = ['title', 'description', 'completed', 'due_date', 'user_id', 'status'];

    protected $hidden = ['user_id', 'deleted_at'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function getStatusAttribute($value)
    {
        return $value == TaskStatus::Completed ? 'Completed' : 'Pending';
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d h:i A');
    }

    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d h:i A');
    }
}
