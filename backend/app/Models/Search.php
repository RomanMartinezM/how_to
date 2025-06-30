<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Carbon;
use MongoDB\Laravel\Eloquent\Model;

class Search extends Model
{
    use HasFactory;

    /**
     * The connection name for the model.
     *
     * @var string
     */
    protected $connection = 'mongodb';

    /**
     * The collection associated with the model.
     *
     * @var string
     */
    protected $collection = 'searches';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'topic',
        'search_result',
    ];

    protected $attributes = [
        'topic' => null,
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'createdAt' => 'datetime',
        'updatedAt' => 'datetime',
        'deletedAt' => 'datetime',
    ];

    /**
     * The storage format of the model's date columns.
     *
     * @var string
     */
    protected $dateFormat = 'Y-m-d H:i:s';

    /**
     * The name of the "created at" column.
     *
     * @var string
     */
    const CREATED_AT = 'createdAt';

    /**
     * The name of the "updated at" column.
     *
     * @var string
     */
    const UPDATED_AT = 'updatedAt';

    /**
     * The name of the "deleted at" column.
     *
     * @var string
     */
    const DELETED_AT = 'deletedAt';

    /**
     * Get the topic attribute.
     *
     * @param  mixed  $value
     * @return string
     */
    public function getTopicAttribute($value)
    {
        return $value;
    }

    /**
     * Set the topic attribute.
     *
     * @param  string  $value
     * @return void
     */
    public function setTopicAttribute($value)
    {
        $this->attributes['topic'] = (string) $value;
    }

    /**
     * Get the search_result attribute.
     *
     * @param  mixed  $value
     * @return string|null
     */
    public function getSearchResultAttribute($value)
    {
        return $value;
    }

    /**
     * Set the search_result attribute.
     *
     * @param  string|null  $value
     * @return void
     */
    public function setSearchResultAttribute($value)
    {
        $this->attributes['search_result'] = $value !== null ? (string) $value : null;
    }
}
