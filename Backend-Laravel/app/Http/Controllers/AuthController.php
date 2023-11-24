<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Rules\ValidarRut;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function create(Request $request)
    {
        $rules = [
            'username' => 'required|string|max:100',
            'password' => 'required|string|min:8',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400);
        }
        $user = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'status' => true,
            'token' => $token,
            'message' => 'User created successfully',
        ], 201);
    }

    public function login(Request $request)
    {
        $rules = [
            'username' => 'required|string|max:100',
            'password' => 'required|string|min:8',
        ];

        $credentials = $request->only('username', 'password');

        if(Auth::guard('api')->attempt($credentials)){
            $user = Auth::guard('api')->user();
            $token = JWTAuth::fromUser($user);
            $success = true;
            $data = compact('user', 'token');
            return compact('success', 'data');
        }
        else{
            $success = false;
            $data = 'Unauthorized';
            return compact('success', 'data');
        }
    }
    public function logout(Request $request)
    {
        // Revocar el token actual del usuario autenticado
        Auth::guard('api')->logout();
        $success = true;
        return compact('success');
    }


    public function index()
    {
        return User::all();
    }

}
