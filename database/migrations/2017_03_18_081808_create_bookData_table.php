<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookData', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('bookType');
            $table->string('author');
            $table->bigInteger('publicationDate');
            $table->string('title');
            $table->string('bookName');
            $table->string('editor');
            $table->string('publishingLoction');
            $table->string('publisher');
            $table->string('period');
            $table->string('chapter');
            $table->string('page');
            $table->string('department');
            $table->string('thesis');
            $table->string('ISBN');
            $table->string('ISSN');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('bookData');
    }
}
