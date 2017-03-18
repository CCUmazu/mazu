<?php

use Illuminate\Database\Seeder;

class bookTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('bookType')->insert(['type' => '專書']);
        DB::table('bookType')->insert(['type' => '專書論文']);
        DB::table('bookType')->insert(['type' => '期刊論']);
        DB::table('bookType')->insert(['type' => '碩博士論文']);
    }
}
