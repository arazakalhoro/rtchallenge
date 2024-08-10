<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UserDetailsUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function profile()
    {
        return response()->json([
            'success'=>true,
            'data' => Auth::user()
        ]);
    }

    public function updateDetails(UserDetailsUpdateRequest $request)
    {
        $user = Auth::user();
        $data = $request->only(['username', 'email']);
        if($user->update($data)){
            return response()->json([
               'success'=>true,
               'message' => 'User details updated successfully'
            ]);
        }
        return response()->json([
           'success'=>false,
           'message' => 'Failed to update user details'
        ],500);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = Auth::user();
        $user->password = $request->get('password');
        if($user->save()){
            return response()->json([
               'success'=>true,
               'message' => 'Password updated successfully'
            ]);
        }
        return response()->json([
           'success'=>false,
           'message' => 'Failed to update password'
        ],500);
    }
}
