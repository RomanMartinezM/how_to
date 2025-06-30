<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Search;
use Illuminate\Support\Facades\Log;

class SearchController extends Controller
{
    
    /**
     * Store a newly created search.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */


    public function create(Request $request): JsonResponse
    {
        try {
            Log::info('Creating new search', ['request' => $request->all()]);

            $validated = $request->validate([
                'topic' => 'nullable|string',
                'search_result' => 'required|string'
            ]);

            $search = Search::create([
                'topic' => $validated['topic'] ?? null,  // Explicitly set to null if not provided
                'search_result' => $validated['search_result']
            ]);
            
            Log::info('Search created successfully', ['search_id' => $search->id]);

            return response()->json([
                'message' => 'Search created successfully',
                'data' => ['id' => $search->id]
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error creating search: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ]);
            
            return response()->json([
                'message' => 'Error creating search',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Return the most recent searches.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMostRecentSearches(): JsonResponse
    {
        try {
            $searches = Search::orderBy('createdAt', 'desc')
                ->limit(3)
                ->get();

            return response()->json([
                'message' => 'Most recent searches retrieved successfully',
                'data' => $searches
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error retrieving most recent searches',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Return the search topics most queried.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * Return the search topics most queried.
     * 
     * This function executes a MongoDB aggregation pipeline to group searches by their topics and count how many times each topic has been searched. It also returns the last time each topic was searched.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSearchTopicsMostQuerying(): JsonResponse
    {
        try {
            $topics = Search::raw(function($collection) {
                return $collection->aggregate([
                    [
                        '$match' => [
                            'topic' => ['$ne' => '']
                        ]
                    ],
                    [
                        '$group' => [
                            '_id' => '$topic',
                            'count' => ['$sum' => 1],
                            'last_searched' => ['$max' => '$createdAt']
                        ]
                    ],
                    [
                        '$sort' => [
                            'count' => -1,
                            'last_searched' => -1
                        ]
                    ],
                    ['$limit' => 3],
                    [
                        '$project' => [
                            'topic' => '$_id',
                            'count' => 1,
                            'last_searched' => 1,
                            '_id' => 0
                        ]
                    ]
                ]);
            });
    
            return response()->json([
                'success' => true,
                'message' => 'Most queried topics retrieved successfully',
                'data' => $topics
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving most queried topics',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}