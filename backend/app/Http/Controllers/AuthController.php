<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use App\Notifications\PasswordResetLink;
use Carbon\Carbon;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
class AuthController extends Controller
{
    protected $jwt;

    public function __construct(JWTAuth $jwt)
    {
        $this->jwt = $jwt;
    }
    public function signUp(SignUpRequest $request, JWTAuth $JWTAuth)
    {
        $user = new User($request->all());
        $user->email_verified_at = Carbon::now();
        if(!$user->save()) {
            return response()->json(['error' => 'Failed to create user'], 500);
        }
        $token = JWTAuth::fromUser($user);
        return response()->json([
            'success' => true,
            'token' => $token,
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ], 201);
    }

    /**
     * Log the user in
     *
     * @param LoginRequest $request
     * @param JWTAuth $JWTAuth
     * @return JsonResponse
     */
    public function login(LoginRequest $request, JWTAuth $JWTAuth): JsonResponse
    {
        try {
            $credentials = $request->only(['email', 'password']);
            if (!Auth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }

            $user = Auth::user();
            $token = JWTAuth::fromUser($user);
            return response()
                ->json([
                    'success' => true,
                    'token' => $token,
                    'expires_in' => auth('api')->factory()->getTTL() * 60
                ]);
        } catch (JWTException $e) {
            Log::error('Got Error during auth login error:'.$e->getMessage());
        }
        return response()
            ->json([
                'success' => false,
                'error' => 'Could not create token'
            ]);

    }

    /**
     * Refresh a token.
     *
     * @return JsonResponse
     */
    public function refresh(): JsonResponse
    {
        $token = Auth::guard()->refresh();

        return response()->json([
            'success' => true,
            'token' => $token,
            'expires_in' => \auth('api')->factory()->getTTL() * 60
        ]);
    }

    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $user = User::whereEmail($request->input('email'))->first();

        if (!$user) {
            return back()->withErrors(['email' => 'We cannot find a user with that email address.']);
        }
        // Get the password broker instance
        $broker = Password::broker();

        // Generate the token
        $token = $broker->createToken($user);

        // Store the token in the database
        DB::table('password_reset_tokens')->updateOrInsert(['email' => $user->email], [
            'email' => $user->email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
        $front_url = env('FRONT_APP_URL');
        $reset_url = $front_url. 'reset-password/'. $token;

        // Send password reset link to user
        $user->notify(new PasswordResetLink($user, $reset_url));
        return response()->json([
            'success' => true,
            'message' => 'We have e-mailed your password reset link!'
        ]);
    }
    public function resetPassword(ResetPasswordRequest $request)
    {
        $data = $request->only(['email', 'token', 'password']);
        if (!$this->tokenVerification($data['token'], $data['email'])) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid token or email'
            ], 422);
        }
        $user = User::where('email', $data['email'])->first();
        $user->password = Hash::make($data['password']);
        if($user->save()){
            $this->expireToken($data['token'], $data['email']);
            return response()->json([
                'success' => true,
                'message' => 'Password changed successfully',
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to change password'
        ], 500);
    }
    private function expireToken($token, $email)
    {
        DB::table('password_reset_tokens')->where('email', $email)->delete();
    }
    private function tokenVerification($token, $email)
    {
        // Find the token record
        $tokenData = DB::table('password_reset_tokens')
            ->where('email', $email)
            ->where('token', $token)
            ->first();
        if (empty($tokenData)) return false;
        // Check if the token has expired
        $expiresAt = Carbon::parse($tokenData->created_at)->addMinutes(config('auth.passwords.users.expire', 60));

        return !(Carbon::now()->greaterThan($expiresAt));
    }
    /**
     * Log the user out (Invalidate the token)
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        $token = JWTAuth::parseToken(request()->header('Authorization'));
        JWTAuth::invalidate($token);
        return response()->json(['message' => 'Logged out successfully']);
    }
}
