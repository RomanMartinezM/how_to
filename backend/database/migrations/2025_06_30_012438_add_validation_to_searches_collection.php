<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * This migration adds a JSON schema validator to the "searches" collection
     * in the MongoDB database. The validator ensures that each document in the
     * collection has a "search_result" field of type string, and optionally a
     * "topic" field of type string. Documents that do not conform to this
     * schema will cause an error when inserted or updated.
     */
    public function up(): void
    {
        DB::connection('mongodb')->command([
            'collMod' => 'searches',
            'validator' => [
                '$jsonSchema' => [
                    'bsonType' => 'object',
                    'required' => ['search_result'],
                    'properties' => [
                        'topic' => [
                            'bsonType' => 'string',
                            'description' => 'optional string field'
                        ],
                        'search_result' => [
                            'bsonType' => 'string',
                            'description' => 'required string field'
                        ]
                    ]
                ]
            ],
            'validationLevel' => 'strict',
            'validationAction' => 'error'
        ]);
    }

    /**
     * Reverse the migrations.
     * This migration removes the JSON schema validator from the "searches"
     * collection in the MongoDB database. The validator was added by the
     * "up" method of this migration. After reversing the migration, documents
     * in the collection will no longer be validated against the JSON schema.
     */
    public function down(): void
    {
        DB::connection('mongodb')->command([
            'collMod' => 'searches',
            'validator' => [],
            'validationLevel' => 'off'
        ]);
    }
};
