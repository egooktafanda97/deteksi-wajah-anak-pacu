<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataAnakPacu extends Model
{
    use HasFactory;
    protected $table = 'data_anak_pacu';
    protected $fillable = [
        "nama",
        "alamat",
        "kecamatan",
        "desa",
        "email",
        "hp",
        "jalur",
        "sejak",
        "foto",
    ];
}
