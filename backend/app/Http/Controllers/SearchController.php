<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function create(Request $request)
    {
        try {
            $validated = $request->validate([
                'topic' => 'required|string',
                'search_result' => 'nullable|string'
            ]);

            $result = DB::connection('mongodb')
                ->collection('searches')
                ->insertGetId([
                    'topic' => $validated['topic'],
                    'search_result' => $validated['search_result'] ?? null,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);

            return response()->json([
                'message' => 'Search created successfully',
                'data' => ['id' => $result]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating search',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}