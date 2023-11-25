<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    //campos del modelo cliente
    protected $fillable = [
        'first_name',
        'second_name',
        'first_last_name',
        'second_last_name',
        'identificador',
        'email',
        'score',
    ];


}
