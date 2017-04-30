<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookClassification extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookClassification', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('bookId')->unsigned();
            $table->foreign('bookId')->references('id')->on('bookData');

            $table->integer('categoryId')->unsigned();
            $table->foreign('categoryId')->references('id')->on('bookCategory');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('bookClassification');
    }
}
