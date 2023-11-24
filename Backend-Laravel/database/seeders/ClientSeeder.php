<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('clients')->insert([
            [
                'first_name'=>'Scarlett',
                'second_name'=>'Annais',
                'first_last_name'=>'Zapata',
                'second_last_name'=>'Cortes',
                'identificador'=>'205450009',
                'email'=>'scar@gmail.com',
                'score'=> 0,
            ],
        	[
                'first_name'=>'Maria',
                'second_name'=>'Josefa',
                'first_last_name'=>'Corte',
                'second_last_name'=>'Cortes',
                'identificador'=>'845406111',
                'email'=>'maria@gmail.com',
                'score'=> 0,
        	],
        ]);
    }
}
