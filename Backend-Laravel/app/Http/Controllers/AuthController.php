<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Rules\ValidarRut;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function create(Request $request)
    {
        $rules = [
            'first_name' => 'required|string|max:100',
            'second_name' => 'required|string|max:100',
            'first_last_name' => 'required|string|max:100',
            'second_last_name' => 'required|string|max:100',
            'identificador' => ['required','unique:users,identificador',new ValidarRut()],
            'email' => 'required|string|email|max:100|unique:users,email',
            'password' => 'required|string|min:8',
            'rol' => 'required|string|max:100',
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
            'rol' => $request->rol,
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
            'email' => 'string|email|max:100',
            'password' => 'required|string'
        ];

        $credentials = $request->only('email', 'password');

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


    public function update(Request $request, User $user)
    {
        $rules = [
            'first_name' => 'required|string|max:100',
            'second_name' => 'required|string|max:100',
            'first_last_name' => 'required|string|max:100',
            'second_last_name' => 'required|string|max:100',
            'email' => 'required|string|email|max:100|unique:users,email,' . $user->id,
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
