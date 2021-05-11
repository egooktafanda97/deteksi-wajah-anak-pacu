<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Desa extends Model
{
    use HasFactory;
    protected $table = 'kelurahan';
    protected $fillable = [
        "id_kel",
        "id_kec",
        "nama"
    ];
}
