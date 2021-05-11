<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;
use Illuminate\Support\Facades\DB;

class PacuJalurController extends Controller
{
    public function laporan()
    {
        $q = DB::table('data_anak_pacu')
            ->select(DB::raw('*, data_anak_pacu.kecamatan as a_kec, data_anak_pacu.desa as a_desa ,kecamatan.nama as nama_kec , kelurahan.nama as nama_desa,data_anak_pacu.id as id_anak_pacu, data_anak_pacu.nama as nama_anak'))
            ->join('kecamatan', function ($join) {
                $join->on('kecamatan.id_kec', '=', 'data_anak_pacu.kecamatan');
            })
            ->join('pacu_jalur', function ($join) {
                $join->on('pacu_jalur.id', '=', 'data_anak_pacu.jalur');
            })
            ->join('kelurahan', function ($join) {
                $join->on('kelurahan.id_kel', '=', 'data_anak_pacu.desa');
            })->get();

        $pdf = PDF::loadview('Laporan', ["data" => $q]);
        return $pdf->stream();
    }
}
