<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PacuJalur extends Model
{
    use HasFactory;
    protected $table = 'pacu_jalur';
    protected $fillable = [
        "id",
        "nama_jalur",
        "alamat",
        "kecamatan",
        "desa",
        "lahir"
    ];
}
