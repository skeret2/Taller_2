<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function create(Request $request)
    {
        $rules = [
            'first_name' => 'required|string|max:100',
            'second_name' => 'required|string|max:100',
            'first_last_name' => 'required|string|max:100',
            'second_last_name' => 'required|string|max:100',
            'identificador' => 'required|string|max:100|unique:users',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:8'
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400);
        }
        $user = User::create([
            'first_name' => $request->first_name,
            'second_name' => $request->second_name,
            'first_last_name' => $request->first_last_name,
            'second_last_name' => $request->second_last_name,
            'identificador' => $request->identificador,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json([
            'status' => true,
            'message' => 'User created successfully',
            'token' => $user->createToken('API TOKEN')->plainTextToken
        ], 200);
    }

    public function login(Request $request)
    {
        $rules = [
            'email' => 'string|email|max:100',
            'password' => 'required|string'
        ];
        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400);
        }
        if (
            !Auth::attempt(['email' => $request->input('email'), 'password' => $request->input('password')])
        ) {
            return response()->json([
                'status' => false,
                'errors' => ['Unauthorized']
            ], 401);
        }

        $user = User::where('email', $request->email)
        ->first();


        return response()->json([
            'status' => true,
            'message' => 'User logged in successfully',
            'data' => $user,
            'token' => $user->createToken('API TOKEN')->plainTextToken
        ], 200);
    }
    public function logout(Request $request)
    {
        // Revocar el token actual del usuario autenticado
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => true,
            'message' => 'User logged out successfully'
        ], 200);
    }


    public function update(Request $request, User $user)
    {
        $rules = [
            'first_name' => 'required|string|max:100',
            'second_name' => 'required|string|max:100',
            'first_last_name' => 'required|string|max:100',
            'second_last_name' => 'required|string|max:100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:8'
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400);
        }
        $user->update($request->input());
        return response()->json([
            'status' => true,
            'message' => 'User updated successfully',
        ], 200);
    }

    public function index()
    {
        return User::all();
    }


    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([
            'res => true',
            'mensaje' => 'User deleted successfully'
        ],200);

    }

}
