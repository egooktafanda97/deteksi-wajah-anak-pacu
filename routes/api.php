<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/getKecamtan', function () {
    return response()->json(\App\Models\Kecamatan::all());
});
Route::post('/getDesa', function (Request $req) {
    $data = \App\Models\Desa::whereidKec($req->id_kec)->get();
    return response()->json($data);
});

Route::post('/insJalur', function (Request $request) {
    try {
        $post = $request->all();
        unset($post['case']);
        unset($post['id']);
        if ($request->case == "update" && !empty($request->id)) {
            $model = \App\Models\PacuJalur::class;
            $sv = $model::whereid($request->id)->update($post);
            if ($sv) {
                return response()->json(["status" => 200, "msg" => "success"]);
            } else {
                return response()->json(["status" => 500, "msg" => "error"]);
            }
        } else if ($request->case == "delete" && !empty($request->id)) {
            $model = \App\Models\PacuJalur::class;
            $sv = $model::whereid($request->id)->delete();
            if ($sv) {
                return response()->json(["status" => 200, "msg" => "success"]);
            } else {
                return response()->json(["status" => 500, "msg" => "error"]);
            }
        } else {
            $model = \App\Models\PacuJalur::class;
            $sv = new $model($post);
            if ($sv->save()) {
                return response()->json(["status" => 200, "msg" => "success"]);
            } else {
                return response()->json(["status" => 500, "msg" => "error"]);
            }
        }
    } catch (\Exception $e) {
        return response()->json(["status" => 500, "msg" => "error"]);
    }
});

Route::get('/dataJalur', function () {
    try {
        $q = DB::table('pacu_jalur')
            ->select(DB::raw('*, kecamatan.nama as nama_kec , kelurahan.nama as nama_desa'))
            ->join('kecamatan', function ($join) {
                $join->on('kecamatan.id_kec', '=', 'pacu_jalur.kecamatan');
            })
            ->join('kelurahan', function ($join) {
                $join->on('kelurahan.id_kel', '=', 'pacu_jalur.desa');
            })->get();
        return response()->json($q);
    } catch (\Exception $e) {
        return response()->json(["status" => 500, "msg" => "error"]);
    }
});


Route::post('/getdataJalurByID', function (Request $req) {
    return response()->json(\App\Models\PacuJalur::whereid($req->id)->first());
});

// ////////////////////////////////////////////////////////
Route::post('/instAnakPacu', function (Request $request) {
    try {
        $post = $request->all();
        unset($post['foto']);
        unset($post['case']);
        unset($post['id']);

        if ($request->case == "update" && !empty($request->id)) {
            $model = \App\Models\DataAnakPacu::class;
            $name = null;
            if ($request->hasFile('foto')) {
                $image = $request->file('foto');
                $name = time() . '.' . $image->getClientOriginalExtension();
                $destinationPath = public_path('/img');
                $image->move($destinationPath, $name);
            }

            if (!empty($name) || $name != null) {
                $d = $post + ["foto" => $name];
            } else {
                $d = $post;
            }
            $sv = $model::whereid($request->id)->update($d);
            if ($sv) {
                return response()->json(["status" => 200, "msg" => "success"]);
            } else {
                return response()->json(["status" => 500, "msg" => "error"]);
            }
        } else if ($request->case == "delete" && !empty($request->id)) {
            $model = \App\Models\DataAnakPacu::class;
            $del = $model::whereid($request->id)->delete();
            if ($del) {
                return response()->json(["status" => 200, "msg" => "success"]);
            } else {
                return response()->json(["status" => 500, "msg" => "error"]);
            }
        } else {
            if ($request->hasFile('foto')) {
                $image = $request->file('foto');
                $name = time() . '.' . $image->getClientOriginalExtension();
                $destinationPath = public_path('/img');
                $image->move($destinationPath, $name);
                $model = \App\Models\DataAnakPacu::class;

                $sv = new $model($post + ["foto" => $name]);
                if ($sv->save()) {
                    return response()->json(["status" => 200, "msg" => "success"]);
                } else {
                    return response()->json(["status" => 500, "msg" => "error"]);
                }
            } else {
                return response()->json(["status" => 500, "msg" => "error"]);
            }
        }
    } catch (\Exception $e) {
        return response()->json(["status" => 500, "msg" => "error"]);
    }
});

Route::get('/dataAnakPacu', function () {
    try {
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
        return response()->json($q);
    } catch (\Exception $e) {
        return response()->json(["status" => 500, "msg" => "error"]);
    }
});
Route::post('/dataAnakPacuById', function (Request $req) {
    try {
        $q = DB::table('data_anak_pacu')
            ->select(DB::raw('*, data_anak_pacu.kecamatan as a_kec, data_anak_pacu.desa as a_desa ,kecamatan.nama as nama_kec , kelurahan.nama as nama_desa,data_anak_pacu.id as id_anak_pacu, data_anak_pacu.nama as nama_anak, pacu_jalur.nama_jalur as nama_jalur'))
            ->join('kecamatan', function ($join) {
                $join->on('kecamatan.id_kec', '=', 'data_anak_pacu.kecamatan');
            })
            ->join('pacu_jalur', function ($join) {
                $join->on('pacu_jalur.id', '=', 'data_anak_pacu.jalur');
            })
            ->join('kelurahan', function ($join) {
                $join->on('kelurahan.id_kel', '=', 'data_anak_pacu.desa');
            })
            ->where('data_anak_pacu.id', $req->id)
            ->first();
        return response()->json($q);
    } catch (\Exception $e) {
        return response()->json(["status" => 500, "msg" => "error"]);
    }
});


Route::get('/img/{img?}', function ($img) {
    return asset('img/' . $img);
});

