<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'username' => 'Ochietto',
            'password' => Hash::make('Jaqamain3pals'),
        ]);

        // Generar el token para el usuario
        $token = JWTAuth::fromUser($user);

        // Puedes imprimir el token si lo necesitas
        echo "Token for admin: $token\n";
    }
}
